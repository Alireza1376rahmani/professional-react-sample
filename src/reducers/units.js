import { fetchUnits, fetchOneUnit, addUnit, updateUnit, deleteUnit } from 'actions/units';

const units = () => {
  const initialState = {
    units: null,
    selectedUnit: null,
  };

  return (state = initialState, { type, response }) => {
    switch (type) {
      case fetchUnits.requestTypes.SUCCESS:
        return {
          selectedUnit: null,
          units: response,
        };
      case addUnit.requestTypes.REQUEST:
        return {
          ...state,
          isSuccessful: false,
        };
      case addUnit.requestTypes.FAILURE:
        return {
          ...state,
          isSuccessful: false,
        };
      case addUnit.requestTypes.SUCCESS:
        return {
          ...state,
          selectedUnit: response,
          isSuccessful: true,
        };
      case updateUnit.requestTypes.REQUEST:
        return {
          ...state,
          isSuccessful: false,
        };
      case updateUnit.requestTypes.FAILURE:
        return {
          ...state,
          isSuccessful: false,
        };
      case updateUnit.requestTypes.SUCCESS:
        return {
          ...state,
          selectedUnit: response,
          isSuccessful: true,
        };
      case fetchOneUnit.requestTypes.SUCCESS:
        return {
          ...state,
          selectedUnit: response,
        };
      case deleteUnit.requestTypes.SUCCESS:
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

export default units();
