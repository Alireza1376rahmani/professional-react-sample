import { makeRequestAction } from './index';

/**
 * Fetch builders
 */
export const fetchBuilders = makeRequestAction('FETCH_BUILDERS', {
  onSuccess(params, response) {
    return { response };
  },
});

export const addBuilder = makeRequestAction('ADD_BUILDER', {
  onSuccess(params, response) {
    return {
      response: {
        ...response,
      },
    };
  },
});

export const updateBuilder = makeRequestAction('UPDATE_BUILDER', {
  onSuccess(params, response) {
    return {
      response: {
        ...response,
      },
    };
  },
});

export const fetchOneBuilder = makeRequestAction('GET_BUILDER', {
  onSuccess(params, response) {
    return {
      response: {
        ...response,
      },
    };
  },
});

export const deleteBuilder = makeRequestAction('DELETE_BUILDER', {
  onSuccess(params, response) {
    return {
      response: { ids: [response.id], type: response.type },
    };
  },
});
