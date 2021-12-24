import { makeRequestAction } from './index';

/**
 * Fetch units
 */
export const fetchUnits = makeRequestAction('FETCH_UNITS', {
  onSuccess(params, response) {
    return {
      response,
    };
  },
});

export const addUnit = makeRequestAction('ADD_UNIT', {
  onSuccess(params, response) {
    return {
      response: {
        ...response,
      },
    };
  },
});

export const updateUnit = makeRequestAction('UPDATE_UNIT', {
  onSuccess(params, response) {
    return {
      response: {
        ...response,
      },
    };
  },
});

export const fetchOneUnit = makeRequestAction('GET_UNIT', {
  onSuccess(params, response) {
    return {
      response: {
        ...response,
      },
    };
  },
});

export const deleteUnit = makeRequestAction('DELETE_UNIT', {
  onSuccess(params, response) {
    return {
      response: { ids: [response.id], type: response.type },
    };
  },
});
