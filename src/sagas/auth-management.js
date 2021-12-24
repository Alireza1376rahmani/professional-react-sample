import { call, takeLatest } from 'redux-saga/effects';
import { notifyUser } from 'actions/auth-management';
import { notifyUserApi } from 'services/auth-management';
import fetchEntity from './fetch-entity';

const fetchNotifyUser = fetchEntity.bind(null, notifyUser.actions, notifyUserApi);

export function* loadNotifyUser({ params }) {
  yield call(fetchNotifyUser, params);
}

function* watchNotifyUser() {
  yield takeLatest(notifyUser.actionName, loadNotifyUser);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  watchNotifyUser,
};
