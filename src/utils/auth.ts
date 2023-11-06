import Cookies from 'js-cookie';

export const TOKEN_KEY = 'westmoney';
const c_token =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxMDA5MTM1MTgwNDQwNTM5MTM2IiwiYXVkIjoid2VzdG1vbmV5IiwicmVnX3RpbWUiOjE2NjA2MzgxNzYsImlzcyI6Indlc3Rtb25leS5jb20iLCJpZCI6IjEwMDAwMDU1OCIsImV4cCI6MTY2MjUxNTM2OSwianRpIjoiJDEkdnhrTXF2YlUkaW9mQUIyOE1odFhEdjFOQThYU1ZIMSIsImxpbWl0cyI6IjMzMyJ9.PadaKz8KU1an9X27828YFLduTpxxepErcVHbshTDiyU';
export const setToken = (token: string, cookieExpires?: any) => {
  Cookies.set(TOKEN_KEY, token, {
    expires: cookieExpires || 1,
  });
};

export const getToken = () => {
  return Cookies.get(TOKEN_KEY);
};

export const getDomain = () => {
  return `${window.location.host.split('.').slice(-2).join('.')}`;
};

export const clearToken = (domain = getDomain()) => {
  Cookies.remove(TOKEN_KEY, {
    domain: domain,
  });
};
