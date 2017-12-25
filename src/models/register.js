import { hashHistory } from 'dva/router';

import * as registerService from '../services/register';

export default {
  namespace: 'register',
  
  state: {},

  effects: {
    * register({
      payload: values,
    }, { put, call }) {
      const data = yield call(registerService.login, values);
      try {
        yield put(hashHistory.push('/'));
      } catch (error) {
        //
      }
    },
  },
};