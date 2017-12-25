import request from '../utils/request';

export function login(values) {
  return request(`/book/login`, {
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