import client from './main-client';

export const fetchAllBuildersApi = params => client().get('/builders', { params });
export const fetchAllBuildersCountApi = params => client().get('/builders/count', { params });
export const fetchOneBuilderApi = ({ id, ...params }) =>
  client().get(`/builders/${id}`, { params });
export const updateBuilderApi = params => client().put(`/builders/${params.id}`, params.values);
export const addBuilderApi = data => client().post('/builders', data);
export const deleteBuilderApi = params => client().delete(`/builders/${params.id}`, { params });
