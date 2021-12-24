import { clearAllErrors } from 'actions/general';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = {}, action) => {
  const { type, params, error } = action;
  if (type === clearAllErrors.actionName) return {};
  const matches = /(.*)_(SUCCESS|FAILURE)/.exec(type);
  // not a *_SUCCESS /  *_FAILURE actions, so we ignore them
  if (!matches) return state;
  const [, requestName, requestState] = matches;
  return {
    ...state,
    // Store whether a request is has errors or not
    // e.g. will be the error when receiving TODOS_FAILURE
    // and false when receiving TODOS_SUCCESS
    [`LOAD_${requestName}${params ? `_${JSON.stringify(params)}` : ''}`]:
      requestState === 'SUCCESS' ? false : error,
  };
};
