import React from 'react';
import useStore from '../store';

const Todos = () => {
  const { todos, toggleTodo, deleteTodo } = useStore((state) => {
    return {
      todos: state.todos,
      toggleTodo: state.toggleTodo,
      deleteTodo: state.deleteTodo,
    };
  });

  return (
    <ul>
      {todos.map((todo) => (
        <li
          key={todo.id}
          style={{
            textDecoration: todo.completed ? 'line-through' : 'none',
          }}
          onClick={() => toggleTodo(todo.id)}
        >
          {todo.text}
          <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default Todos;
