import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
// import { loadState, saveState } from './localStorage';
// import throttle from 'lodash.throttle';
import thunkMiddleware from 'redux-thunk';

// const storageState = loadState;

let middleware = [
  thunkMiddleware,
  // storageState
];

let configureStore = () => {
  return createStore(
    reducers,
    composeWithDevTools(applyMiddleware(...middleware))
  );
};

let store = configureStore();

// store.subscribe(throttle(() => {
//   saveState(store.getState());
// }, 1000));

// export default configureStore;
export default store;
