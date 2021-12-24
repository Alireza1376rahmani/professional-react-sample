import { call, takeLatest, put, select } from 'redux-saga/effects';
import {
  userLogin,
  userLogout,
  clearLoginError,
  userRegister,
  clearRegisteredUser,
  verifyAccount,
  getUsers,
  deleteUsers,
  addNewUsers,
  updateUsers,
  getPageUsers,
  updateLogedInUser,
  getLogedInUser,
  forgotPassword,
  resetPassword,
  updateLogedInUserData,
} from 'actions/users';
import {
  userLoginApi,
  userLogoutApi,
  userRegisterApi,
  userAuthmanagementApi,
  getUsersApi,
  deleteUsersApi,
  addNewUserApi,
  updateUsersApi,
  getUserApi,
} from 'services/users';
import fetchEntity from './fetch-entity';

const fetchRegister = fetchEntity.bind(null, userRegister.actions, userRegisterApi);

export function* loadUserRegister({ params }) {
  yield call(fetchRegister, { ...params });
}

function* watchUserRegister() {
  yield takeLatest(userRegister.actionName, loadUserRegister);
}

const fetchLogin = fetchEntity.bind(null, userLogin.actions, userLoginApi);

export function* loadUserLogin({ params }) {
  yield call(fetchLogin, { ...params, strategy: 'local' });
}

function* watchUserLogin() {
  yield takeLatest(userLogin.actionName, loadUserLogin);
}

const fetchUserLogout = fetchEntity.bind(null, userLogout.actions, userLogoutApi);

export function* loadUserLogout() {
  yield call(fetchUserLogout, {});
}

function* watchUserLogout() {
  yield takeLatest(userLogout.actionName, loadUserLogout);
}

export function* loadClearUserLoginError() {
  yield put(userLogin.actions.failure({}, false));
}

function* watchClearUserLoginError() {
  yield takeLatest(clearLoginError.actionName, loadClearUserLoginError);
}

/**
 * Clear registered user reducer
 */
export function* loadClearRegisteredUser() {
  yield put(userRegister.actions.success({}, null));
}

function* watchClearUserRegister() {
  yield takeLatest(clearRegisteredUser.actionName, loadClearRegisteredUser);
}

/**
 * Verify Account
 */
const fetchVerifyAccount = fetchEntity.bind(null, verifyAccount.actions, userAuthmanagementApi);

export function* loadUserVerifyAccount({ params }) {
  yield call(fetchVerifyAccount, params);
}

function* watchUserVerifyAccount() {
  yield takeLatest(verifyAccount.actionName, loadUserVerifyAccount);
}

const fetchForgotPassword = fetchEntity.bind(null, forgotPassword.actions, userAuthmanagementApi);

export function* loadUserForgotPassword({ params }) {
  yield call(fetchForgotPassword, params);
}

function* watchUserForgotPassword() {
  yield takeLatest(forgotPassword.actionName, loadUserForgotPassword);
}

const fetchResetPassword = fetchEntity.bind(null, resetPassword.actions, userAuthmanagementApi);

export function* loadResetPassword({ params }) {
  yield call(fetchResetPassword, params);
}

function* watchResetPassword() {
  yield takeLatest(resetPassword.actionName, loadResetPassword);
}

const fetchUsers = fetchEntity.bind(null, getUsers.actions, getUsersApi);
const fetchPageUsers = fetchEntity.bind(null, getPageUsers.actions, getUsersApi);
const fetchAddNewUser = fetchEntity.bind(null, addNewUsers.actions, addNewUserApi);

const fetchUpdateUser = fetchEntity.bind(null, updateUsers.actions, updateUsersApi);

const fetchDeleteUsers = fetchEntity.bind(null, deleteUsers.actions, deleteUsersApi);

export function* loadGetPageUsers({ params }) {
  yield call(fetchPageUsers, { ...params });
}

function* watchGetPageUsers() {
  yield takeLatest([getPageUsers.actionName], loadGetPageUsers);
}

export function* loadGetPageUsersOnChange() {
  yield call(fetchPageUsers, { _sort: 'created_at:DESC' });
}

function* watchGetPageUsersOnChange() {
  // yield takeLatest(
  //   [
  //     deleteUsers.requestTypes.SUCCESS,
  //     addNewUsers.requestTypes.SUCCESS,
  //     updateUsers.requestTypes.SUCCESS,
  //   ],
  //   loadGetPageUsersOnChange
  // );
}

export function* loadGetUsers({ params }) {
  yield call(fetchUsers, { ...params });
}
function* watchGetUsers() {
  yield takeLatest(getUsers.actionName, loadGetUsers);
}

export function* loadUpdateUsers({ params }) {
  yield call(fetchUpdateUser, { ...params });
}

function* watchUpdateUsers() {
  yield takeLatest(updateUsers.actionName, loadUpdateUsers);
}

export function* loadAddNewUser({ params }) {
  yield call(fetchAddNewUser, { ...params });
}

function* watchAddNewUser() {
  yield takeLatest(addNewUsers.actionName, loadAddNewUser);
}
export function* loadDeleteUsers({ params }) {
  yield call(fetchDeleteUsers, { ...params });
}

function* watchDeleteUsers() {
  yield takeLatest(deleteUsers.actionName, loadDeleteUsers);
}

const fetchLogedInUser = fetchEntity.bind(null, getLogedInUser.actions, getUserApi);

export function* loadUpdateLogedInUser({ params }) {
  yield call(fetchUpdateUser, { ...params });
  const loggedInUserId = yield select(state => state.user.user.loggedInUser.user.id);
  yield call(fetchLogedInUser, { id: loggedInUserId });
}
export function* loadUpdateLogedInUserData() {
  const loggedInUserId = yield select(state => state.user.user.loggedInUser.user.id);
  yield call(fetchLogedInUser, { id: loggedInUserId });
}

function* watchUpdateLogedInUser() {
  yield takeLatest(updateLogedInUser.actionName, loadUpdateLogedInUser);
}
function* watchUpdateLogedInUserData() {
  yield takeLatest(updateLogedInUserData.actionName, loadUpdateLogedInUserData);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  watchGetUsers,
  watchUpdateUsers,
  watchAddNewUser,
  watchDeleteUsers,
  watchGetPageUsers,
  watchGetPageUsersOnChange,
  watchUserLogin,
  watchUserLogout,
  watchUserRegister,
  watchClearUserLoginError,
  watchClearUserRegister,
  watchUserVerifyAccount,
  watchUpdateLogedInUser,
  watchUserForgotPassword,
  watchResetPassword,
  watchUpdateLogedInUserData,
};
