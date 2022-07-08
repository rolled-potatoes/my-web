import instance from './instance';

export function getAuth() {
  return instance({
    method: 'get',
    url: '/auth/check',
  });
}
