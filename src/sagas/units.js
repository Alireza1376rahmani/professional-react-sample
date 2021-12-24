import { call, takeLatest, put, select } from 'redux-saga/effects';
import { fetchUnits, fetchOneUnit, addUnit, updateUnit, deleteUnit } from 'actions/units';
import {
  fetchAllUnitsApi,
  fetchOneUnitApi,
  addUnitApi,
  updateUnitApi,
  deleteUnitApi,
} from 'services/units';
import fetchEntity from './fetch-entity';

const fetchUnitsData = fetchEntity.bind(null, fetchUnits.actions, fetchAllUnitsApi);

const fetchUnitData = fetchEntity.bind(null, fetchOneUnit.actions, fetchOneUnitApi);

const fetchAddUnit = fetchEntity.bind(null, addUnit.actions, addUnitApi);

const fetchUpdateUnit = fetchEntity.bind(null, updateUnit.actions, updateUnitApi);

const fetchDeleteUnit = fetchEntity.bind(null, deleteUnit.actions, deleteUnitApi);

export function* loadFetchUnits({ params }) {
  yield call(fetchUnitsData, { ...params });
}

export function* loadGetUnit({ params }) {
  yield put(fetchOneUnit.actions.failure({}, undefined));
  yield call(fetchUnitData, params);
}

export function* loadAddUnit({ params }) {
  yield call(fetchAddUnit, params);
}

export function* loadUpdateUnit({ params }) {
  yield call(fetchUpdateUnit, params);
}

export function* loadDeleteUnit({ params }) {
  yield call(fetchDeleteUnit, { ...params });
}

function* watchFetchUnits() {
  yield takeLatest(fetchUnits.actionName, loadFetchUnits);
}

function* watchAddUnit() {
  yield takeLatest(addUnit.actionName, loadAddUnit);
}

function* watchUpdateUnit() {
  yield takeLatest(updateUnit.actionName, loadUpdateUnit);
}

function* watchDeleteUnit() {
  yield takeLatest(deleteUnit.actionName, loadDeleteUnit);
}

function* watchGetUnit() {
  yield takeLatest(fetchOneUnit.actionName, loadGetUnit);
}

export function* loadUnitsOnChange({ params }) {
  const units = yield select(state => state.units);
  const { total, skip, limit } = units;
  if (skip && skip >= total) {
    yield call(fetchUnitsData, {
      $skip: total - Math.max(total % limit, limit),
      '$sort[updatedAt]': -1,
    });
  } else {
    yield call(fetchUnitsData, { $skip: skip, '$sort[updatedAt]': -1 });
  }
}

function* watchUnitsOnChange() {
  yield takeLatest([deleteUnit.requestTypes.SUCCESS], loadUnitsOnChange);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  watchFetchUnits,
  watchAddUnit,
  watchGetUnit,
  watchUpdateUnit,
  watchUnitsOnChange,
  watchDeleteUnit,
};
