import client from './main-client';

export const fetchDecorCategoriesApi = params => client().get('/dc-categories', { params });
