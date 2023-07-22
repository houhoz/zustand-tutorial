type Iparams = {
  username: string;
  password: string;
};
export const login = ({ username, password }: Iparams) => {
  return new Promise((reslove, reject) => {
    reslove({ refreshToken: '', accessToken: '' });
  });
};
