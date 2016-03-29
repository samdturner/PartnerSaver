import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Layout from '../layout/Layout';
import TasksContainer from '../containers/TasksContainer';
import PartnersContainer from '../containers/PartnersContainer';

export default (
  <Route path="/" component={Layout}>
    <IndexRoute
      component={TasksContainer}
    />
    <Route
      path="partners"
      component={PartnersContainer}
    />
  </Route>
);
