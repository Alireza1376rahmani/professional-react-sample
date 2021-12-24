import {
  fetchAllocationRequests,
  fetchOneAllocationRequest,
  addAllocationRequest,
  updateAllocationRequest,
} from 'actions/allocation-requests';

import { createSelector } from 'reselect';
import createLoadingSelector from './create-loading-selector';
import createErrorSelector from './create-error-selector';

export const getAllocationRequests = state => state.allocationRequests;
export const getAllocationRequestsState = createSelector(getAllocationRequests, data =>
  data.allocationRequests ? data.allocationRequests : []
);

export const getSuccessState = createSelector(getAllocationRequests, data => data.isSuccessful);
export const getSelectedAllocationRequest = createSelector(
  getAllocationRequests,
  data => data.selectedAllocationRequest
);

export const allocationRequestsValuesLoading = createLoadingSelector(
  fetchAllocationRequests.actionName
)();
export const allocationRequestsValuesError = createErrorSelector(
  fetchAllocationRequests.actionName
)();

export const getAddAllocationRequestLoading = createLoadingSelector(
  addAllocationRequest.actionName
)();
export const getAddAllocationRequestError = createErrorSelector(addAllocationRequest.actionName)();

export const getUpdateAllocationRequestLoading = createLoadingSelector(
  updateAllocationRequest.actionName
)();
export const getUpdateAllocationRequestError = createErrorSelector(
  updateAllocationRequest.actionName
)();

export const getSelectedAllocationRequestLoading = createLoadingSelector(
  fetchOneAllocationRequest.actionName
)();
export const getSelectedAllocationRequestError = createErrorSelector(
  fetchOneAllocationRequest.actionName
)();
