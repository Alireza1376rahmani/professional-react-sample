import { combineReducers } from 'redux';
import {
  userLogin,
  userLogout,
  getUsers,
  deleteUsers,
  addNewUsers,
  updateUsers,
  getPageUsers,
  getLogedInUser,
  forgotPassword,
  resetPassword,
} from 'actions/users';
import { emptyState } from 'configs/localStorage';

const users = () => {
  const initialState = {
    loggedInUser: null,
  };

  return (state = initialState, { type, error, record, loggedInUser }) => {
    switch (type) {
      case userLogin.requestTypes.SUCCESS:
        return {
          ...state,
          loggedInUser,
          isSuccessful: false,
        };
      case getLogedInUser.requestTypes.SUCCESS:
        return {
          ...state,
          loggedInUser: {
            ...state.loggedInUser,
            user: loggedInUser,
          },
          isSuccessful: false,
        };
      case userLogout.requestTypes.SUCCESS:
        emptyState();
        return initialState;
      case userLogout.requestTypes.FAILURE:
        emptyState();
        return initialState;
      case forgotPassword.requestTypes.SUCCESS:
        return {
          ...state,
          isForgotPasswordEmailSuccess: true,
        };
      case forgotPassword.requestTypes.REQUEST:
        return {
          ...state,
          isForgotPasswordEmailSuccess: false,
        };
      case resetPassword.requestTypes.SUCCESS:
        return {
          ...state,
          isResetPasswordSuccess: true,
        };
      case resetPassword.requestTypes.REQUEST:
        return {
          ...state,
          isResetPasswordSuccess: false,
        };
      default:
        return state;
    }
  };
};

const relatedUsers = () => {
  const initialState = {};
  return (state = initialState, action) => {
    const { type, response } = action;
    switch (type) {
      case getPageUsers.requestTypes.SUCCESS:
      case getUsers.requestTypes.SUCCESS:
        return {
          ...response,
          isSuccessful: false,
        };
      case deleteUsers.requestTypes.SUCCESS:
        return {
          ...state,
        };
      case addNewUsers.requestTypes.REQUEST:
      case updateUsers.requestTypes.REQUEST:
        return {
          ...state,
          isSuccessful: false,
        };
      case addNewUsers.requestTypes.SUCCESS:
      case updateUsers.requestTypes.SUCCESS:
        return {
          ...state,
          isSuccessful: true,
        };
      case addNewUsers.requestTypes.FAILURE:
      case updateUsers.requestTypes.FAILURE:
        return {
          ...state,
          isSuccessful: false,
        };
      default:
        return state;
    }
  };
};
//
// const userRoles = () => {
//   const initialState = {
//     selectedUser: {},
//   };
//
//   return (state = initialState, { type, error, record }) => {
//     switch (type) {
//       case 'TEST_ACTION':
//         return {
//           ...initialState,
//           selectedUser: record,
//         };
//       default:
//         return state;
//     }
//   };
// };

export default combineReducers({
  user: users(),
  relatedUsers: relatedUsers(),
});
