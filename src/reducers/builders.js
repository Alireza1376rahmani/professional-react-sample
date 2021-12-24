import {
  fetchBuilders,
  fetchOneBuilder,
  addBuilder,
  updateBuilder,
  deleteBuilder,
} from 'actions/builders';

const builders = () => {
  const initialState = {
    builders: null,
    selectedBuilder: null,
  };

  return (state = initialState, { type, response }) => {
    switch (type) {
      case fetchBuilders.requestTypes.SUCCESS:
        return {
          selectedBuilder: null,
          builders: response,
        };
      case addBuilder.requestTypes.REQUEST:
        return {
          ...state,
          isSuccessful: false,
        };
      case addBuilder.requestTypes.FAILURE:
        return {
          ...state,
          isSuccessful: false,
        };
      case addBuilder.requestTypes.SUCCESS:
        return {
          ...state,
          selectedBuilder: response,
          isSuccessful: true,
        };
      case updateBuilder.requestTypes.REQUEST:
        return {
          ...state,
          isSuccessful: false,
        };
      case updateBuilder.requestTypes.FAILURE:
        return {
          ...state,
          isSuccessful: false,
        };
      case updateBuilder.requestTypes.SUCCESS:
        return {
          ...state,
          selectedBuilder: response,
          isSuccessful: true,
        };
      case fetchOneBuilder.requestTypes.SUCCESS:
        return {
          ...state,
          selectedBuilder: response,
        };
      case deleteBuilder.requestTypes.SUCCESS:
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

export default builders();
