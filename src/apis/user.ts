import request from '@/utils/request';

// 获取useInfo
// export const getUserInfo = () => {
//   return request({
//     url: '/auth/principal',
//     method: 'get',
//   });
// };

// 获取useInfo
export const getUserInfo = () => {
  return request({
    url: "/mocks/userInfo.json",
    method: "get",
  });
};
export const userLogin = (data) => {
  return request({
    url: '/auth/login',
    method: 'post',
    data,
  });
};


export function buildMenus() {
  return request({
    url: "/mocks/menus.json",
    method: "get",
  });
}
