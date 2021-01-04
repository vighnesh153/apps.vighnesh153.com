import Cookie from 'js-cookie';

const isDev = window.location.href.startsWith('http://localhost');

export const isLoggedIn = () => {
  const user = Cookie.get('user');
  return !!user;
};

export const isAdmin = () => {
  const user = JSON.parse(Cookie.get('user') || {});
  const userRoles = user.roles || [];
  return userRoles.includes('admin');
};

const getPostAuthRedirectUrl = () => {
  const devPostAuthRedirectUrl = 'http://localhost:3000?authSuccess';
  const prodPostAuthRedirectUrl = 'https://apps.vighnesh153.com?authSuccess';
  const url = isDev ? devPostAuthRedirectUrl : prodPostAuthRedirectUrl;
  return encodeURIComponent(url);
};

export const getAuthUrl = () => {
  const devAuthUrl = 'http://localhost:3010';
  const prodAuthUrl = 'https://auth.vighnesh153.com';
  const url = isDev ? devAuthUrl : prodAuthUrl;

  const redirectTo = getPostAuthRedirectUrl();
  return `${url}?redirectTo=${redirectTo}`;
};
