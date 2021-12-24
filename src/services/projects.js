import client from './main-client';

export const fetchAllProjectsApi = params => client().get('/projects', { params });
export const fetchAllProjectsCountApi = params => client().get('/projects/count', { params });
export const fetchOneProjectApi = ({ id, ...params }) =>
  client().get(`/projects/${id}`, { params });
export const updateProjectApi = params => client().put(`/projects/${params.id}`, params.values);
export const addProjectApi = data => client().post('/projects', data);
export const deleteProjectApi = params => client().delete(`/projects/${params.id}`, { params });
