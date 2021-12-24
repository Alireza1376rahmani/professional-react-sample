import client from './main-client';

export const fetchAllAllocationRequestsApi = params =>
  client().get('/allocation-requests', { params });
export const fetchOneAllocationRequestApi = ({ id, ...params }) =>
  client().get(`/allocation-requests/${id}`, { params });
export const updateAllocationRequestApi = params =>
  client().put(`/allocation-requests/${params.id}`, params.values);
export const addAllocationRequestApi = data => client().post('/allocation-requests', data);
export const deleteAllocationRequestApi = params =>
  client().delete(`/allocation-requests/${params.id}`, { params });
