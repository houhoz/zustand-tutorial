/*
 * 负责创建 Store 的方法与 Action 方法
 *
 * */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { State } from './initialState';
import { initialState, initUser, initToken } from './initialState';
import { login } from '../services/login';

interface Action {
  resetUser: () => void;
  resetToken: () => void;
  login: (params: {
    username: string;
    password: string;
  }) => Promise<boolean>;
}

export type Store = State & Action;

// 这里加了持久化中间件persist，数据会储存在localStorage或者sessionStorage（选用session需要配置）里，
// 刷新和关闭网页之后，数据依然能恢复
// 其他比如devtools等中间件类似用法，再次包裹复合使用也可以
export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      ...initialState,

      // 重置用户信息
      resetUser: () => {
        set({ ...initUser });
      },
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
    {
      name: 'app-storage',
    }
  )
);
