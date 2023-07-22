import React from 'react';
import { shallow } from 'zustand/shallow';
import Todos from './components/Todos';
import TodosControl from './components/TodosControl';
import useStore from './store';

function App() {
  // 一种方法是逐个访问状态，创建新的常量。
  // const amount = useBookStore((state) => state.amount);
  // const title = useBookStore((state) => state.title);

  // 创建一个具有多个状态或属性的单一对象。而且为了告诉Zustand浅层地扩散这个对象，我们必须传递shallow函数。
  const { amount, title } = useStore(
    (state) => ({ amount: state.amount, title: state.title }),
    shallow
  );

  return (
    <div className="App">
      <h1>{amount}</h1>
      <h2>{title}</h2>
      <TodosControl />
      <Todos />
    </div>
  );
}

export default App;
