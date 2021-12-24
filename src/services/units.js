import client from './main-client';

export const fetchAllUnitsApi = params => client().get('/units', { params });
export const fetchOneUnitApi = ({ id, ...params }) => client().get(`/units/${id}`, { params });
export const updateUnitApi = params => client().put(`/units/${params.id}`, params.values);
export const addUnitApi = data => client().post('/units', data);
export const deleteUnitApi = params => client().delete(`/units/${params.id}`, { params });
export const fetchUnitExposure = params => client().get('/custom/unitExposureModels', { params });
