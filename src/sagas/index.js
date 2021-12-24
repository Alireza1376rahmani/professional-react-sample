import { all, fork } from 'redux-saga/effects';

import users from './users';
import allocationRequests from './allocation-requests';
import authManagement from './auth-management';
import projects from './projects';
import units from './units';
import builders from './builders';

const combinedSagas = {
  ...users,
  ...allocationRequests,
  ...authManagement,
  ...projects,
  ...units,
  ...builders,
};

export default function* rootSaga() {
  yield all(Object.values(combinedSagas).map(fork));
}
