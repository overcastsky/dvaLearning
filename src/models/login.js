
import { hashHistory } from 'dva/router';
import * as loginService from '../services/login';

export default {
  namespace: 'login',

  state: {},

  effects: {
    * login({
      payload: params,
    }, { put, call }) {
      const data = yield call(loginService.login, params);
      
      try {
        // yield put(hashHistory.push('/indexPage'))
        if (data.data.resultCode === '000000') {
          yield put(hashHistory.push('/books'));
        } else {
          alert('该用户名不存在,请注册后登录');
        }
      } catch (error) {
        //
      }
    },
  },
};