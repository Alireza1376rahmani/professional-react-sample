import client from 'services/main-client';

// eslint-disable-next-line import/prefer-default-export
export const notifyUserApi = data => client().post('/authManagement', data);
