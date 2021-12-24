import { createSelector } from 'reselect';
import {
  userLogin,
  userLogout,
  userRegister,
  verifyAccount,
  getUsers as fetchUsers,
  getPageUsers,
  addNewUsers,
  deleteUsers,
  updateUsers,
  forgotPassword,
  resetPassword,
} from 'actions/users';
import createLoadingSelector from './create-loading-selector';
import createErrorSelector from './create-error-selector';

export const getUserState = state => state.user;

export const getRegisteredUser = state => state.entities.user;

export const getUser = createSelector(getUserState, state => state.user.loggedInUser);
export const getUserData = createSelector(getUser, user => user && user.user);
export const getUserRole = createSelector(
  getUserData,
  data => (data && data.role.type) || 'brokers'
);
export const getIsPayed = createSelector(
  getUserData,
  data => data && data.profile && data.profile.isPayed
);
export const getProfileUsersLimit = createSelector(
  getUserData,
  data => data && data.profile && data.profile.numberOfSubUsers
);

export const userIsVerified = createSelector(
  getUserData,
  userData => userData && userData.isVerified
);

export const userIsAuth = createSelector(getUser, user => user && !!user.jwt);
// register selectors
export const registerLoading = createLoadingSelector(userRegister.actionName)();
export const registerError = createErrorSelector(userRegister.actionName)();

// login selectors
export const loginLoading = createLoadingSelector(userLogin.actionName)();
export const loginError = createErrorSelector(userLogin.actionName)();

// logout selectors
export const logoutLoading = createLoadingSelector(userLogout.actionName)();
export const logoutError = createErrorSelector(userLogout.actionName)();

// verify selectors
export const verifyLoading = createLoadingSelector(verifyAccount.actionName)();
export const verifyError = createErrorSelector(verifyAccount.actionName)();

export const forgotPasswordLoading = createLoadingSelector(forgotPassword.actionName)();
export const forgotPasswordError = createErrorSelector(forgotPassword.actionName)();

export const resetPasswordLoading = createLoadingSelector(resetPassword.actionName)();
export const resetPasswordError = createErrorSelector(resetPassword.actionName)();

export const getUsersState = state => state.user && state.user.relatedUsers;
export const getErrorsState = state => state.error;

export const getForgotPasswordEmailSuccessState = createSelector(
  getUserState,
  state => state.user.isForgotPasswordEmailSuccess
);

export const getResetPasswordSuccessState = createSelector(
  getUserState,
  state => state.user.isResetPasswordSuccess
);

export const getUsers = createSelector(getUsersState, state => ({
  ...state,
  data: state.data || [],
}));

export const getSuccessState = createSelector(getUsersState, state => state.isSuccessful);

export const usersLoading = createLoadingSelector(fetchUsers.actionName)();
export const usersError = createErrorSelector(fetchUsers.actionName)();

export const pageUsersLoading = createLoadingSelector(getPageUsers.actionName)();
export const pageUsersError = createErrorSelector(getPageUsers.actionName)();

export const addNewUsersLoading = createLoadingSelector(addNewUsers.actionName)();
export const addNewUsersError = createErrorSelector(addNewUsers.actionName)();

export const updateUsersLoading = createLoadingSelector(updateUsers.actionName)();
export const updateUsersError = createErrorSelector(updateUsers.actionName)();

export const deleteUsersLoading = createLoadingSelector(deleteUsers.actionName)();
export const deleteUsersError = createErrorSelector(deleteUsers.actionName)();

export const getUsersFormErrors = createSelector(getErrorsState, errors => {
  const existingErrorsArray = [];
  const errorsArray = [
    addNewUsers.actionName,
    deleteUsers.actionName,
    updateUsers.actionName,
    getPageUsers.actionName,
    getUsers.actionName,
  ];

  errorsArray.forEach(error => {
    errors[error] && existingErrorsArray.push(errors[error]);
  });
  return existingErrorsArray.length === 0 ? false : existingErrorsArray;
});
