import { makeRequestAction } from './index';

/**
 * Fetch projects
 */
export const fetchProjects = makeRequestAction('FETCH_PROJECTS', {
  onSuccess(params, response) {
    return {
      response,
    };
  },
});

export const addProject = makeRequestAction('ADD_PROJECT', {
  onSuccess(params, response) {
    return {
      response: {
        ...response,
      },
    };
  },
});

export const updateProject = makeRequestAction('UPDATE_PROJECT', {
  onSuccess(params, response) {
    return {
      response: {
        ...response,
      },
    };
  },
});

export const fetchOneProject = makeRequestAction('GET_PROJECT', {
  onSuccess(params, response) {
    return {
      response: {
        ...response,
      },
    };
  },
});

export const deleteProject = makeRequestAction('DELETE_PROJECT', {
  onSuccess(params, response) {
    return {
      response: { ids: [response.id], type: response.type },
    };
  },
});
