import {createStore, combineReducers, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import {LOGOUT} from './actions/actionTypes';
import homeReducer from './reducers/homeReducer';
import loginReducer from './reducers/loginReducer';
import profileReducer from './reducers/profileReducer';

const appReducer = combineReducers({
  login: loginReducer,
  home: homeReducer,
  profile: profileReducer,
});

const rootReducer = (state, action) => {
  if (action.type === LOGOUT) {
    state = undefined;
  }

  return appReducer(state, action);
};

let middleware = [thunk];

if (__DEV__) {
  //   const reduxImmutableStateInvariant = require("redux-immutable-state-invariant").default();
  middleware = [...middleware, logger];
} else {
  middleware = [...middleware];
}

const configStore = createStore(rootReducer, applyMiddleware(...middleware));

export default configStore;
