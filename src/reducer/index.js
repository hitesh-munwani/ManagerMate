import { combineReducers } from '@reduxjs/toolkit';
import currentUserReducer from './currentUserReducer';

const rootReducer = combineReducers({
  currentUserReducer,
});

export default rootReducer;
