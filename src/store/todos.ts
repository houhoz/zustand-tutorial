import { StateCreator } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Store } from './index';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}
export interface ITodos {
  todos: Todo[];
  addTodo: (text: string) => void;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
}

export const createTodos: StateCreator<
  Store,
  [],
  [['zustand/persist', ITodos]],
  ITodos
> = persist(
  (set) => ({
    todos: [],
    addTodo: (text) =>
      set((state) => ({
        todos: [
          ...state.todos,
          {
            id: Date.now(),
            text,
            completed: false,
          },
        ],
      })),
    toggleTodo: (id) =>
      set((state) => ({
        todos: state.todos.map((todo) =>
          todo.id === id
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      })),
    deleteTodo: (id) => {
      set((state) => ({
        todos: state.todos.filter((todo) => todo.id !== id),
      }));
    },
  }),
  {
    name: 'todos',
    storage: createJSONStorage(() => sessionStorage), // // (optional) by default, 'localStorage' is used
    // @ts-ignore
    partialize: (state) =>
      Object.fromEntries<ITodos>(
        Object.entries(state).filter(([key]) =>
          ['todos'].includes(key)
        )
      ),
    // partialize: (state) => ({
    //   todos: state.todos,
    // }),
  }
);
