import { combineReducers } from 'redux';
import quiz from './quiz/reducers';

const appReducer = combineReducers({
  quiz
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
