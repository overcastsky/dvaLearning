import request from '../utils/request';

export function register(values) {
  return request(`/book/register`, {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Accept': 'application/json',
    },
    body: JSON.stringify(values),
  });
}