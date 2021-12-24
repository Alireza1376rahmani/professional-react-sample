import { call, takeLatest, put, select } from 'redux-saga/effects';
import {
  fetchBuilders,
  fetchOneBuilder,
  addBuilder,
  updateBuilder,
  deleteBuilder,
} from 'actions/builders';
import {
  fetchAllBuildersApi,
  fetchOneBuilderApi,
  addBuilderApi,
  updateBuilderApi,
  deleteBuilderApi,
} from 'services/builders';
import fetchEntity from './fetch-entity';

const fetchBuildersData = fetchEntity.bind(null, fetchBuilders.actions, fetchAllBuildersApi);

const fetchBuilderData = fetchEntity.bind(null, fetchOneBuilder.actions, fetchOneBuilderApi);

const fetchAddBuilder = fetchEntity.bind(null, addBuilder.actions, addBuilderApi);

const fetchUpdateBuilder = fetchEntity.bind(null, updateBuilder.actions, updateBuilderApi);

const fetchDeleteBuilder = fetchEntity.bind(null, deleteBuilder.actions, deleteBuilderApi);

export function* loadFetchBuilders({ params }) {
  yield call(fetchBuildersData, { ...params });
}

export function* loadGetBuilder({ params }) {
  yield put(fetchOneBuilder.actions.failure({}, undefined));
  yield call(fetchBuilderData, params);
}

export function* loadAddBuilder({ params }) {
  yield call(fetchAddBuilder, params);
}

export function* loadUpdateBuilder({ params }) {
  yield call(fetchUpdateBuilder, params);
}

export function* loadDeleteBuilder({ params }) {
  yield call(fetchDeleteBuilder, { ...params });
}

function* watchFetchBuilders() {
  yield takeLatest(fetchBuilders.actionName, loadFetchBuilders);
}

function* watchAddBuilder() {
  yield takeLatest(addBuilder.actionName, loadAddBuilder);
}

function* watchUpdateBuilder() {
  yield takeLatest(updateBuilder.actionName, loadUpdateBuilder);
}

function* watchDeleteBuilder() {
  yield takeLatest(deleteBuilder.actionName, loadDeleteBuilder);
}

function* watchGetBuilder() {
  yield takeLatest(fetchOneBuilder.actionName, loadGetBuilder);
}

export function* loadBuildersOnChange({ params }) {
  const builders = yield select(state => state.builders);
  const { total, skip, limit } = builders;
  if (skip && skip >= total) {
    yield call(fetchBuildersData, {
      $skip: total - Math.max(total % limit, limit),
      '$sort[updatedAt]': -1,
    });
  } else {
    yield call(fetchBuildersData, { $skip: skip, '$sort[updatedAt]': -1 });
  }
}

function* watchBuildersOnChange() {
  yield takeLatest([deleteBuilder.requestTypes.SUCCESS], loadBuildersOnChange);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  watchFetchBuilders,
  watchAddBuilder,
  watchGetBuilder,
  watchUpdateBuilder,
  watchBuildersOnChange,
  watchDeleteBuilder,
};
