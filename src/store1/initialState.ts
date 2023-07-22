/*
 * 负责 State —— 添加状态类型与初始化状态值
 *
 * */

// 登录用户信息
export interface User {
  userInfo: {
    userId: number | undefined;
    nickName: string;
    userName: string;
    portraitUrl?: string;
    favoriteCatCategory: number | undefined;
  };
}

// 用户信息初始值
export const initUser: User = {
  userInfo: {
    userId: undefined,
    nickName: '',
    userName: '',
    favoriteCatCategory: undefined,
  },
};

export interface Token {
  accessToken: string | null;
  refreshToken: string | null;
}

interface Dog {
  dog: {
    loading: boolean;
    url?: string;
  };
}

interface Cat {
  cat: {
    loading: boolean;
    url?: string;
  };
}

// token信息初始值
export const initToken: Token = {
  accessToken: null,
  refreshToken: null,
};

export const initDog: Dog = {
  dog: {
    loading: false,
    url: '',
  },
};

export const initCat: Cat = {
  cat: {
    loading: false,
    url: '',
  },
};

export type State = User & Token & Dog & Cat;

export const initialState: State = {
  ...initUser,
  ...initToken,
  ...initDog,
  ...initCat,
};
