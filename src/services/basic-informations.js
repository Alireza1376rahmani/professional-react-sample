import client from './main-client';

export const fetchAllBasicInformationApi = params =>
  client().get('/basic-informations', { params });
