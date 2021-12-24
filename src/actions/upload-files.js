import { makeRequestAction } from './index';

/**
 * Fetch upload-files
 */
export const fetchUploadFiles = makeRequestAction('FETCH_UPLOAD_FILES', {
  onSuccess(params, response) {
    return {
      response: {
        ...response,
      },
    };
  },
});

export const addUploadFile = makeRequestAction('ADD_UPLOAD_FILE', {
  onSuccess(params, response) {
    return {
      response: {
        ...response,
      },
    };
  },
});

export const updateUploadFile = makeRequestAction('UPDATE_UPLOAD_FILE', {
  onSuccess(params, response) {
    return {
      response: {
        ...response,
      },
    };
  },
});

export const fetchOneUploadFile = makeRequestAction('GET_UPLOAD_FILE', {
  onSuccess(params, response) {
    return {
      response: {
        ...response,
      },
    };
  },
});

export const deleteUploadFile = makeRequestAction('DELETE_UPLOAD_FILE', {
  onSuccess(params, response) {
    return {
      response: { ids: [response.id], type: response.type },
    };
  },
});
