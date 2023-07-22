import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { createBook, IBook } from './book';
import { createTodos, ITodos } from './todos';

export type Store = IBook & ITodos;

const useStore = create<Store>()(
  persist(
    (...a) => ({
      ...createBook(...a),
      ...createTodos(...a),
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
  )
);

export default useStore;
