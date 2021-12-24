import { makeRequestAction } from './index';

/**
 * Fetch allocation-requests
 */
export const fetchAllocationRequests = makeRequestAction('FETCH_ALLOCATION_REQUESTS', {
  onSuccess(params, response) {
    return {
      response,
    };
  },
});

export const addAllocationRequest = makeRequestAction('ADD_ALLOCATION_REQUEST', {
  onSuccess(params, response) {
    return {
      response: {
        ...response,
      },
    };
  },
});

export const updateAllocationRequest = makeRequestAction('UPDATE_ALLOCATION_REQUEST', {
  onSuccess(params, response) {
    return {
      response: {
        ...response,
      },
    };
  },
});

export const fetchOneAllocationRequest = makeRequestAction('GET_ALLOCATION_REQUEST', {
  onSuccess(params, response) {
    return {
      response: {
        ...response,
      },
    };
  },
});

export const deleteAllocationRequest = makeRequestAction('DELETE_ALLOCATION_REQUEST', {
  onSuccess(params, response) {
    return {
      response: { ids: [response.id], type: response.type },
    };
  },
});
