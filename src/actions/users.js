import { makeRequestAction } from './index';

/**
 * User Register
 */
export const userRegister = makeRequestAction('USER_REGISTER', {
  onSuccess(params, response) {
    return {
      response: {
        entities: {
          user: response,
          userEmailVerificationSent: false,
        },
      },
    };
  },
});

/**
 * User login
 */
export const userLogin = makeRequestAction('USER_LOGIN', {
  onSuccess(params, response) {
    return {
      loggedInUser: response,
    };
  },
});

/**
 * User Logout
 */
export const userLogout = makeRequestAction('USER_LOGOUT');

/**
 * Clear Login Error
 */
export const clearLoginError = makeRequestAction('CLEAR_USER_LOGIN_ERROR');

export const clearRegisteredUser = makeRequestAction('CLEAR_REGISTERED_USER');

/**
 * Verify Account
 */
export const verifyAccount = makeRequestAction('VERIFY_ACCOUNT');
export const forgotPassword = makeRequestAction('FORGOT_PASSWORD');
export const resetPassword = makeRequestAction('RESET_PASSWORD');

// export const getUsers = makeRequestAction('GET_USERS', {
//   onSuccess(params, response) {
//     return {
//       response: {
//         ...response,
//       },
//     };
//   },
// });

export const getUsers = makeRequestAction('GET_USERS', {
  onSuccess(params, response) {
    return {
      response: {
        ...response,
        data: [...response],
      },
    };
  },
});

export const getPageUsers = makeRequestAction('GET_PAGE_USERS', {
  onSuccess(params, response) {
    return {
      response: {
        ...response,
      },
    };
  },
});

export const addNewUsers = makeRequestAction('ADD_NEW_USER');

export const deleteUsers = makeRequestAction('DELETE_USERS', {
  onSuccess(params, response) {
    return {
      response,
    };
  },
});

export const updateUsers = makeRequestAction('UPDATE_USER');

export const updateLogedInUser = makeRequestAction('UPDATE_LOGEDIN_USER');
export const updateLogedInUserData = makeRequestAction('UPDATE_LOGEDIN_USER_DATA');
export const getLogedInUser = makeRequestAction('GET_LOGEDIN_USER', {
  onSuccess(params, response) {
    return {
      loggedInUser: response,
    };
  },
});
