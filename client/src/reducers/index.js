import { combineReducers } from 'redux';
import api from './api';
import tasks from './tasks';
import user from './user';

const rootReducer = combineReducers({
  api,
  tasks,
  user,
});

export default rootReducer;
