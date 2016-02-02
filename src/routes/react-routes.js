import React from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import useQueries from 'history/lib/useQueries';
import useBasename from 'history/lib/useBasename';

export const history = useQueries(
  useBasename(createBrowserHistory)
)({queryKey: false});

import App from '../components/app';
import Polls from '../containers/polls';
import Poll from '../components/poll';
import Users from '../containers/users';
import User from '../components/user';
import Signup from '../containers/signup';

export default () => (
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={Polls}/>
      <Route path='polls' component={Polls}>
        <Route path=':poll' component={Poll}/>
      </Route>
      <Route path='users' component={Users}>
        <Route path=':user' component={User}/>
      </Route>
      <Route path='signup' component={Signup}/>
    </Route>
  </Router>
);
