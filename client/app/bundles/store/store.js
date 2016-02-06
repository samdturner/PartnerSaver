import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'libs/middlewares/loggerMiddleware';
import reducers from '../reducers';
import { initalStates } from '../reducers';

export default props => {
  const initialTasks = props;
  const { $$tasksState } = initalStates;
  const initialState = {
    $$store: $$tasksState.merge({
      $$tasks: initialTasks,
    }),
  };

  const reducer = combineReducers(reducers);
  const composedStore = compose(
    applyMiddleware(thunkMiddleware, loggerMiddleware)
  );

  return composedStore(createStore)(reducer, initialState);
};
