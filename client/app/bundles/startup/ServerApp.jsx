import React from 'react';
import { Provider } from 'react-redux';

import createStore from '../store/store';
import NonRouterCommentsContainer from '../containers/NonRouterCommentsContainer';

export default props => {
  const store = createStore(props);
  return (
      <Provider store={store}>
        <NonRouterCommentsContainer />
      </Provider>
  );
};
