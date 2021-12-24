import {
  fetchAllocationRequests,
  fetchOneAllocationRequest,
  addAllocationRequest,
  updateAllocationRequest,
  deleteAllocationRequest,
} from 'actions/allocation-requests';

const allocationRequests = () => {
  const initialState = {
    allocationRequests: null,
    selectedAllocationRequest: null,
  };

  return (state = initialState, { type, response }) => {
    switch (type) {
      case fetchAllocationRequests.requestTypes.SUCCESS:
        return {
          selectedAllocationRequest: null,
          allocationRequests: response,
        };
      case addAllocationRequest.requestTypes.REQUEST:
        return {
          ...state,
          isSuccessful: false,
        };
      case addAllocationRequest.requestTypes.FAILURE:
        return {
          ...state,
          isSuccessful: false,
        };
      case addAllocationRequest.requestTypes.SUCCESS:
        return {
          ...state,
          selectedAllocationRequest: response,
          isSuccessful: true,
        };
      case updateAllocationRequest.requestTypes.REQUEST:
        return {
          ...state,
          isSuccessful: false,
        };
      case updateAllocationRequest.requestTypes.FAILURE:
        return {
          ...state,
          isSuccessful: false,
        };
      case updateAllocationRequest.requestTypes.SUCCESS:
        return {
          ...state,
          selectedAllocationRequest: response,
          isSuccessful: true,
        };
      case fetchOneAllocationRequest.requestTypes.SUCCESS:
        return {
          ...state,
          selectedAllocationRequest: response,
        };
      case deleteAllocationRequest.requestTypes.SUCCESS:
        return {
          ...state,
          [response.type]: { ...state[response.type], total: state.total - response.ids.length },
          type: response.type,
        };
      default:
        return state;
    }
  };
};

export default allocationRequests();
