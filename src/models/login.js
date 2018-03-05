import { message } from 'antd';
// import { hashHistory } from 'dva/router';
import { browserHistory } from 'dva/router';
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
        if (data.data.type === 'old') {
          // yield put(hashHistory.push('/reset'));
          yield put(browserHistory.push('/reset'));
          return;
        }
        const state = data.data.state;
        const userUM = data.data.userUM;
        sessionStorage.setItem('state', state);
        sessionStorage.setItem('userUM', userUM);
        if (data.data.resultCode === '000000') {
          // yield put(hashHistory.push('/books'));
          yield put(browserHistory.push('/books'));
        } else {
          message.info(data.data.resultMesg);
        }
      } catch (error) {
        //
      }
    },
  },
};