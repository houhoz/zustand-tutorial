import { StateCreator } from 'zustand';
import { login } from '../services/login';
import { Store } from './createStore';
import { persist } from 'zustand/middleware';

export interface Token {
  accessToken: string | null;
  refreshToken: string | null;
  resetToken: () => void;
  login: (params: {
    username: string;
    password: string;
  }) => Promise<boolean>;
}

export const initToken = {
  accessToken: null,
  refreshToken: null,
};
export const createToken: StateCreator<
  Store,
  [],
  [['zustand/persist', Token]],
  Token
> = persist(
  (set) => ({
    accessToken: null,
    refreshToken: null,
    // 重置token信息
    resetToken: () => {
      set({ ...initToken });
    },
    login: async (params) => {
      const res: any = await login(params);
      console.log('login: ', res);

      if (res) {
        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);
        set({ ...res });

        return true;
      } else {
        return false;
      }
    },
  }),
  { name: 'zustand-slice' }
);
