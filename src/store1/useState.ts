/*
 * 自定义state hooks
 * 可以根据参数自定义查询state
 * 也可以先查询其他state的数据，根据数据值再查询想要的数据
 *
 * */
import { useStore } from './createStore';
import { shallow } from 'zustand/shallow';

// 提现shallow的作用，可以尝试去掉shallow参数，去Shallow页面点击修改userId和userName的按钮，
// 查看控制台打印值，对比二者的打印值，体会shallow的左右（浅比较在性能优化方面的作用）
//
export const useTokenAndUserName = (type?: string) =>
  useStore((state) => {
    if (type && type === 'user') {
      return {
        userName: state.userInfo.userName,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
      };
    } else {
      return {
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
      };
    }
  }, shallow);
export const useAccessToken = () =>
  useStore((state) => state.accessToken);
export const useRefreshToken = () =>
  useStore((state) => state.refreshToken);
export const useUserInfo = () => useStore((state) => state.userInfo);

export const useUserInfoExist = () => {
  const accessToken = useAccessToken();
  const refreshToken = useRefreshToken();
  const userInfo = useUserInfo();
  if (accessToken && refreshToken) {
    return {
      exist: true,
      userInfo: userInfo,
    };
  } else {
    return {
      exist: false,
    };
  }
};
