import client from './main-client';

export const fetchAllUploadFilesApi = params => client().get('/upload-files', { params });
export const fetchOneUploadFileApi = ({ id, ...params }) =>
  client().get(`/upload-files/${id}`, { params });
export const updateUploadFileApi = params =>
  client().put(`/upload-files/${params.id}`, params.values);
export const addUploadFileApi = data => client().post('/upload', data);
export const deleteUploadFileApi = params =>
  client().delete(`/upload-files/${params.id}`, { params });
