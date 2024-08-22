export const API_BASE_URL = `${process.env.REACT_APP_API_URL}`;
console.log(API_BASE_URL);

export const ENDPOINTS = {
  login: '/auth/sign-in',
  signup: '/auth/sign-up',
  signout: '/auth/sign-out',
  user: '/user/current',
};