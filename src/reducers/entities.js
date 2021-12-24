import merge from 'deepmerge';

// eslint-disable-next-line import/no-anonymous-default-export
export default (
  state = {
    user: null,
    userEmailVerificationSent: false,
  },
  action
) => {
  if (action.response && action.response.entities) {
    return merge.all([state, action.response.entities], {
      clone: false,
      arrayMerge: (destinationArray, sourceArray) => sourceArray,
    });
  }

  return state;
};
