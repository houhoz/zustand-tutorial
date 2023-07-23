# react+zustand

在react项目中使用zustand

> zustand是一个精简、快速、可扩展的状态管理器，特别契合react hook下开发。


1. initialState、createStore、自定义hooks式组织方式

```
./store
├─createStore.ts ----- // 负责创建 Store 的方法与 Action 方法
├─index.ts ----------- // 导出所有类型、状态与hooks
├─initialState.ts ---- // 负责 State —— 添加状态类型与初始化状态值
└─useState.ts -------- // 自定义state hooks，方便复用与筛选查询

```

2. 切片组织方式

```
./store
├─cat.ts 
├─createStore.ts 
├─dog.ts 
├─index.ts 
├─token.ts 
├─useState.ts 
└─user.ts 
```

参考：
- https://juejin.cn/post/7203262276572823609
- https://github.com/pmndrs/zustand/blob/main/docs/integrations/persisting-store-data.md#options



目前还不清楚那种写法更好
```
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

```