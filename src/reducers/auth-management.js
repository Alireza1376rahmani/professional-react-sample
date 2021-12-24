import { notifyUser } from 'actions/auth-management';

const authManagement = () => {
  const initialState = {};

  return (state = initialState, { type, response }) => {
    switch (type) {
      case notifyUser.requestTypes.SUCCESS:
        return {
          ...response,
        };
      default:
        return state;
    }
  };
};

export default authManagement();
