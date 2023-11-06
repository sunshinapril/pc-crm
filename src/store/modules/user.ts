import { getUserInfo, userLogin } from '@/apis/user';
import { defineStore } from 'pinia';
import { clearToken } from '@/utils/auth';
interface userInfo {
  [key: string]: any;
}

export const useUser = defineStore({
  id: 'user-pinia',
  state: () => ({
    token: <string>'',
    userInfo: <userInfo | null>null,
  }),
  getters: {
    getToken: (state) => state.token,
    getUserInfo: (state) => state.userInfo,
  },
  actions: {
    setToken(token: string) {
      this.token = token;
    },
    setUserInfo(info: userInfo) {
      this.userInfo = info;
    },
    async login(loginForm) {
      return Promise.resolve(true);
      // try {
      //   const res = await userLogin(loginForm);
      //   return res;
      // } catch (err) {
      //   clearToken();
      //   throw err;
      // }
    },
    async info() {
      const res: any = await getUserInfo();
      this.setUserInfo({
        ...res.data,
      });
    },
  },
});
