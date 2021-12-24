import client from './main-client';

export const fetchAllDecorOptionsApi = params => client().get('/project-decor-options', { params });
export const fetchAllDecorOptionsCountApi = params =>
  client().get('/project-decor-options/count', { params });
export const fetchOneDecorOptionsApi = ({ id, ...params }) =>
  client().get(`/project-decor-options/${id}`, { params });
export const updateDecorOptionsApi = params =>
  client().put(`/project-decor-options/${params.id}`, params.values);
export const addDecorOptionsApi = data => client().post('/project-decor-options', data);
export const deleteDecorOptionsApi = params =>
  client().delete(`/project-decor-options/${params.id}`, { params });

export const fetchAllFloorPremiumsApi = params => client().get('/project-floor-levels', { params });
export const fetchAllFloorPremiumsCountApi = params =>
  client().get('/project-floor-levels/count', { params });
export const updateFloorPremiumsApi = params =>
  client().put(`/project-floor-levels/${params.id}`, params.values);

export const fetchAllProjectFinishesApi = params =>
  client().get('/project-decor-selects', { params });
export const fetchAllProjectFinishesCountApi = params =>
  client().get('/project-decor-selects/count', { params });
export const addProjectFinishesApi = data => client().post('/project-decor-selects', data);

export const fetchAllModelPlansApi = params => client().get('/models', { params });
export const fetchAllModelPlansCountApi = params => client().get('/models/count', { params });
export const fetchAllUnitsSuitesApi = params => client().get('/units', { params });
export const fetchAllUnitsSuitesCountApi = params => client().get('/units/count', { params });
export const fetchParkingLockerApi = params => client().get('/project-amenities', { params });
export const fetchParkingLockerCountApi = params =>
  client().get('/project-amenities/count', { params });
export const fetchIncentivesApi = params => client().get('/project-incentives', { params });
export const fetchIncentivesCountApi = params =>
  client().get('/project-incentives/count', { params });
export const fetchPremiumsApi = params => client().get('/project-premiums', { params });
export const fetchPremiumsCountApi = params => client().get('/project-premiums/count', { params });
export const fetchDepositSetsApi = params => client().get('/project-deposit-sets', { params });
export const fetchDepositDetsApi = params => client().get('/project-deposit-dets', { params });
export const fetchDepositSetsCountApi = params =>
  client().get('/project-deposit-sets/count', { params });
export const fetchAllRoomsApi = params => client().get('/system-master-rooms', { params });
export const fetchDecorProductsApi = params => client().get('/dc-products', { params });
export const fetchFinishesApi = params => client().get('/dx-supp-selects', { params });
export const fetchFinishesCountApi = params => client().get('/dx-supp-selects/count', { params });
export const fetchUnitMeasureApi = params =>
  client().get('/basic-informations?type=unitMeasure', { params });
export const fetchUpgApi = params =>
  client().get('/basic-informations?type=optionType', { params });

export const fetchAllocationTypes = params =>
  client().get('/custom/allocationtypelist', { params });
export const fetchSalesSources = params => client().get('/custom/salessourcelist', { params });

export const fetchAgentClasses = params => client().get('/custom/agentclasslist', { params });
export const fetchModelRooms = params => client().get('/custom/modelrooms', { params });
