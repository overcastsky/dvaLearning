import React from 'react';
import {
	Router,
	Route,
} from 'dva/router';
import IndexPage from './routes/IndexPage';

import Users from './routes/Users.js';

import Books from './routes/Books.js';

import AfterRead from './routes/AfterRead.js';

import Login from './routes/Login.js';

import Register from './routes/Register.js';

import AfterReadShow from './routes/afterReadShow.js';

import Reset from './routes/Reset.js';


function RouterConfig({
	history,
}) {
  return (
    <Router history={history}>
      <Route path="/register" component={Register} />
      <Route path="/" component={Login} />
      <Route path="/indexPage" component={IndexPage} />
      <Route path="/books" component={Books} />
      <Route path="/afterRead" component={AfterRead} />
      <Route path="/afterReadshow" component={AfterReadShow} />
      <Route path="/reset" component={Reset} />
    </Router>
  );
}

export default RouterConfig;