import { call, takeLatest, put, select } from 'redux-saga/effects';
import {
  fetchUploadFiles,
  fetchOneUploadFile,
  addUploadFile,
  updateUploadFile,
  deleteUploadFile,
} from 'actions/upload-files';
import {
  fetchAllUploadFilesApi,
  fetchOneUploadFileApi,
  addUploadFileApi,
  updateUploadFileApi,
  deleteUploadFileApi,
} from 'services/upload-files';
import fetchEntity from './fetch-entity';

const fetchUploadFilesData = fetchEntity.bind(
  null,
  fetchUploadFiles.actions,
  fetchAllUploadFilesApi
);

const fetchUploadFileData = fetchEntity.bind(
  null,
  fetchOneUploadFile.actions,
  fetchOneUploadFileApi
);

const fetchAddUploadFile = fetchEntity.bind(null, addUploadFile.actions, addUploadFileApi);

const fetchUpdateUploadFile = fetchEntity.bind(null, updateUploadFile.actions, updateUploadFileApi);

const fetchDeleteUploadFile = fetchEntity.bind(null, deleteUploadFile.actions, deleteUploadFileApi);

export function* loadFetchUploadFiles({ params }) {
  yield call(fetchUploadFilesData, { ...params });
}

export function* loadGetUploadFile({ params }) {
  yield put(fetchOneUploadFile.actions.failure({}, undefined));
  yield call(fetchUploadFileData, params);
}

export function* loadAddUploadFile({ params }) {
  yield call(fetchAddUploadFile, params);
}

export function* loadUpdateUploadFile({ params }) {
  yield call(fetchUpdateUploadFile, params);
}

export function* loadDeleteUploadFile({ params }) {
  yield call(fetchDeleteUploadFile, { ...params });
}

function* watchFetchUploadFiles() {
  yield takeLatest(fetchUploadFiles.actionName, loadFetchUploadFiles);
}

function* watchAddUploadFile() {
  yield takeLatest(addUploadFile.actionName, loadAddUploadFile);
}

function* watchUpdateUploadFile() {
  yield takeLatest(updateUploadFile.actionName, loadUpdateUploadFile);
}

function* watchDeleteUploadFile() {
  yield takeLatest(deleteUploadFile.actionName, loadDeleteUploadFile);
}

function* watchGetUploadFile() {
  yield takeLatest(fetchOneUploadFile.actionName, loadGetUploadFile);
}

export function* loadUploadFilesOnChange({ params }) {
  const uploadFiles = yield select(state => state.uploadFiles);
  const { total, skip, limit } = uploadFiles;
  if (skip && skip >= total) {
    yield call(fetchUploadFilesData, {
      $skip: total - Math.max(total % limit, limit),
      '$sort[updatedAt]': -1,
    });
  } else {
    yield call(fetchUploadFilesData, { $skip: skip, '$sort[updatedAt]': -1 });
  }
}

function* watchUploadFilesOnChange() {
  yield takeLatest([deleteUploadFile.requestTypes.SUCCESS], loadUploadFilesOnChange);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  watchFetchUploadFiles,
  watchAddUploadFile,
  watchGetUploadFile,
  watchUpdateUploadFile,
  watchUploadFilesOnChange,
  watchDeleteUploadFile,
};
