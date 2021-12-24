import { combineReducers } from 'redux';

import entities from './entities';
import loading from './loading';
import error from './error';
import user from './users';
import uploads from './uploads';
import authManagement from './auth-management';
import allocationRequests from './allocation-requests';
import projects from './projects';
import units from './units';
import builders from './builders';

const appReducer = combineReducers({
  entities,
  loading,
  error,
  user,
  uploads,
  authManagement,
  allocationRequests,
  projects,
  units,
  builders,
});

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => appReducer(state, action);
