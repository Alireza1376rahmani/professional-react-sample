import { call, takeLatest, put, select } from 'redux-saga/effects';
import {
  fetchAllocationRequests,
  fetchOneAllocationRequest,
  addAllocationRequest,
  updateAllocationRequest,
  deleteAllocationRequest,
} from 'actions/allocation-requests';
import {
  fetchAllAllocationRequestsApi,
  fetchOneAllocationRequestApi,
  addAllocationRequestApi,
  updateAllocationRequestApi,
  deleteAllocationRequestApi,
} from 'services/allocation-requests';
import fetchEntity from './fetch-entity';

const fetchAllocationRequestsData = fetchEntity.bind(
  null,
  fetchAllocationRequests.actions,
  fetchAllAllocationRequestsApi
);

const fetchAllocationRequestData = fetchEntity.bind(
  null,
  fetchOneAllocationRequest.actions,
  fetchOneAllocationRequestApi
);

const fetchAddAllocationRequest = fetchEntity.bind(
  null,
  addAllocationRequest.actions,
  addAllocationRequestApi
);

const fetchUpdateAllocationRequest = fetchEntity.bind(
  null,
  updateAllocationRequest.actions,
  updateAllocationRequestApi
);

const fetchDeleteAllocationRequest = fetchEntity.bind(
  null,
  deleteAllocationRequest.actions,
  deleteAllocationRequestApi
);

export function* loadFetchAllocationRequests({ params }) {
  yield call(fetchAllocationRequestsData, { ...params });
}

export function* loadGetAllocationRequest({ params }) {
  yield put(fetchOneAllocationRequest.actions.failure({}, undefined));
  yield call(fetchAllocationRequestData, params);
}

export function* loadAddAllocationRequest({ params }) {
  yield call(fetchAddAllocationRequest, params);
}

export function* loadUpdateAllocationRequest({ params }) {
  yield call(fetchUpdateAllocationRequest, params);
}

export function* loadDeleteAllocationRequest({ params }) {
  yield call(fetchDeleteAllocationRequest, { ...params });
}

function* watchFetchAllocationRequests() {
  yield takeLatest(fetchAllocationRequests.actionName, loadFetchAllocationRequests);
}

function* watchAddAllocationRequest() {
  yield takeLatest(addAllocationRequest.actionName, loadAddAllocationRequest);
}

function* watchUpdateAllocationRequest() {
  yield takeLatest(updateAllocationRequest.actionName, loadUpdateAllocationRequest);
}

function* watchDeleteAllocationRequest() {
  yield takeLatest(deleteAllocationRequest.actionName, loadDeleteAllocationRequest);
}

function* watchGetAllocationRequest() {
  yield takeLatest(fetchOneAllocationRequest.actionName, loadGetAllocationRequest);
}

export function* loadAllocationRequestsOnChange({ params }) {
  const allocationRequests = yield select(state => state.allocationRequests);
  const { total, skip } = allocationRequests;
  if (skip && skip >= total) {
    yield call(fetchAllocationRequestsData, {
      _sort: 'created_at:DESC',
    });
  } else {
    yield call(fetchAllocationRequestsData, {
      _sort: 'created_at:DESC',
    });
  }
}

function* watchAllocationRequestsOnChange() {
  yield takeLatest(
    [
      addAllocationRequest.requestTypes.SUCCESS,
      updateAllocationRequest.requestTypes.SUCCESS,
      deleteAllocationRequest.requestTypes.SUCCESS,
    ],
    loadAllocationRequestsOnChange
  );
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  watchFetchAllocationRequests,
  watchAddAllocationRequest,
  watchGetAllocationRequest,
  watchUpdateAllocationRequest,
  watchAllocationRequestsOnChange,
  watchDeleteAllocationRequest,
};
