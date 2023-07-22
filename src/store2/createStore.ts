import { create } from 'zustand';
// import { createUser, User } from './user';
import { createToken, Token } from './token';
// import { createCat, Cat } from './cat';
// import { createDog, Dog } from './dog';

// export type Store = User & Token & Cat & Dog;
export type Store = Token;

export const useStore = create<Store>()((...a) => ({
  ...createToken(...a),
  // ...createUser(...a),
  // ...createCat(...a),
  // ...createDog(...a),
}));
