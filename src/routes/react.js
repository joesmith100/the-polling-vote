import React from 'react';
import {Router, Route, IndexRoute, useRouterHistory} from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';

export const history = useRouterHistory(
  createBrowserHistory
)({ queryKey: false });

import App from '../containers/app';
import Polls from '../containers/polls';
import Poll from '../components/poll';
import Users from '../containers/users';
import User from '../components/user';
import Signup from '../containers/signup';
import Login from '../containers/login';

export default () => (
  <Router history={history}>
    <Route path='/' component={App}>
      <IndexRoute component={Polls}/>
      <Route path='polls' component={Polls}>
        <Route path=':poll' component={Poll}/>
      </Route>
      <Route path='users' component={Users}>
        <Route path=':user' component={User}/>
      </Route>
      <Route path='signup' component={Signup}/>
      <Route path='login' component={Login}/>
    </Route>
  </Router>
);
