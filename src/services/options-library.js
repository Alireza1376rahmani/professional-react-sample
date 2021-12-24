import client from './main-client';

export const fetchAllDecorProductsApi = params => client().get('/dc-products', { params });
export const fetchAllDecorProductsCountApi = params =>
  client().get('/dc-products/count', { params });

export const fetchAllDecorCategoriesApi = params => client().get('/dc-categories', { params });
export const fetchAllDecorCategoriesCountApi = params =>
  client().get('/dc-categories/count', { params });

export const fetchAllSelectionGroupsApi = params => client().get('/dc-select-groups', { params });
export const fetchAllSelectionGroupsCountApi = params =>
  client().get('/dc-select-groups/count', { params });

export const fetchAllDecorLibsApi = params => client().get('/dc-decor-libs', { params });
export const fetchAllSuppliersApi = params => client().get('/system-master-suppliers', { params });
export const fetchAllSubCategoriesApi = params => client().get('/dx-sub-categories', { params });
