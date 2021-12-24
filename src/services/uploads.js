import client from './main-client';

export const addUploadApi = data => {
  const formData = new FormData();
  formData.append('files', data);
  return client({ 'Content-type': 'application/x-www-form-urlencoded' })
    .post('/upload', formData)
    .then(res => res)
    .catch(() => null);
};
export const addBase64UploadApi = data => client().post('/file-storage', data);
export const deleteUploadApi = params => client().delete(`/upload/files/${params?.id}`);
