import { StateCreator } from 'zustand';
import { Store } from './index';

export interface IBook {
  amount: number;
  title: string;
  updateAmount: (by: number) => void;
}

export const createBook: StateCreator<Store, [], [], IBook> = (
  set
) => ({
  amount: 40,
  title: "Alice's Adventures in Wonderland",
  updateAmount: (by: number) =>
    set((state) => ({ amount: state.amount + by })),
});
