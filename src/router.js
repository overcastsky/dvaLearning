import React from 'react';
import {
	Router,
  Route,
  browserHistory,
} from 'dva/router';
// import { BrowserRouter, Router, Route } from 'dva/router';

import IndexPage from './routes/IndexPage/IndexPage';

import Users from './routes/Users/Users.js';

import Books from './routes/Books//Books.js';

import AfterRead from './routes/AfterRead/AfterRead.js';

import Login from './routes/Login/Login.js';

import Register from './routes/Register/Register.js';

import AfterReadShow from './routes/AfterReadShow/afterReadShow.js';

import Reset from './routes/Reset/Reset.js';


// function RouterConfig({
//   history,
// }) {
//   return (
//     <Router history={history}>
//       <Route path="/register" component={Register} />
//       <Route path="/" component={Login} />
//       <Route path="/indexPage" component={IndexPage} />
//       <Route path="/books" component={Books} />
//       <Route path="/afterRead" component={AfterRead} />
//       <Route path="/afterReadshow" component={AfterReadShow} />
//       <Route path="/reset" component={Reset} />
//       <Route path="/bookquery" component={Books} />
//     </Router>
//   );
// }

function RouterConfig() {
  return (
    <Router history={browserHistory}>
      <Route path="/register" component={Register} />
      <Route path="/" component={Login} />
      <Route path="/indexPage" component={IndexPage} />
      <Route path="/books" component={Books} />
      <Route path="/afterRead" component={AfterRead} />
      <Route path="/afterReadshow" component={AfterReadShow} />
      <Route path="/reset" component={Reset} />
      <Route path="/bookquery" component={Books} />
    </Router>
  );
}

export default RouterConfig;