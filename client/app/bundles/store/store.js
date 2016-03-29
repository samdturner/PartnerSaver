import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'libs/middlewares/loggerMiddleware';
import reducers from '../reducers';
import { initalStates } from '../reducers/index.js';

import Immutable from 'immutable';

export default props => {
  const { tasks, partners } = props.props;
  let { $$tasksState, $$partnersState } = initalStates;

  $$tasksState = $$tasksState.set('$$tasks', Immutable.fromJS(JSON.parse(tasks)));
  $$partnersState = $$partnersState.set('$$partners', Immutable.fromJS(JSON.parse(partners)));

  const initialState = {
    $$tasksStore: $$tasksState,
    $$partnersStore: $$partnersState
  };

  const reducer = combineReducers(reducers);
  const composedStore = compose(
    applyMiddleware(thunkMiddleware, loggerMiddleware)
  );

  return composedStore(createStore)(reducer, initialState);
};
