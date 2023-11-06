import axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import { getToken } from '@/utils/auth';
import { goLogin } from '@/utils';

const service = axios.create({
  // baseURL: import.meta.env.VITE_BASE_URL,
  baseURL: '',
  timeout: 50000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
});

let loading: any = null;

const close = () => {
  if (loading) {
    loading.close();
  }
};

// 拦截器

service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // loading = ElLoading.service({
    //   lock: true,
    //   text: 'loading',
    //   background: 'rgba(0,0,0,.2)',
    // });
    if (config && config.headers) {
      config.headers.Authorization = 'Bearer ' + getToken();
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

service.interceptors.response.use(
  (res: AxiosResponse) => {
    close();
    if (res.status === 200) {
      const { code } = res.data;
      if (code === 0) {
        return res.data;
      } else {
        // ElNotification({
        //   title: 'Error',
        //   message: (res.data && res.data.message) || 'error',
        //   type: 'error',
        // });
        return Promise.reject(res.data);
      }
    } else {
      return Promise.reject(res);
    }
  },
  (err) => {
    close();
    const { status } = (err && err.response) || {};
    if (status === 401) {
      const { error } = err.response.data;
      // ElNotification({
      //   title: 'Error',
      //   message: error,
      //   type: 'error',
      // });
      // token过期
      goLogin();
    } else {
      // ElNotification({
      //   title: 'Error',
      //   message: (err.response.data && err.response.data.message) || 'error',
      //   type: 'error',
      // });
      return Promise.reject(err.response);
    }
  },
);

export default service;
