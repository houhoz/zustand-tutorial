import { create } from 'zustand';
import { createBook, IBook } from './book';
import { createTodos, ITodos } from './todos';

export type Store = IBook & ITodos;

const useStore = create<Store>()((...a) => ({
  ...createBook(...a),
  ...createTodos(...a),
}));

export default useStore;
