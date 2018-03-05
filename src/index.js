import Promise from 'promise-polyfill';
import dva from 'dva';
import { browserHistory } from 'dva/router';
import './index.css';


if (!window.Promise) {
  window.Promise = Promise;
}

// 1. Initialize
// const app = dva();
const app = dva({ history: browserHistory });

app.model(require('./models/books'));
app.model(require('./models/login'));
app.model(require('./models/register'));

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');