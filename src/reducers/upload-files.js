import {
  fetchUploadFiles,
  fetchOneUploadFile,
  addUploadFile,
  updateUploadFile,
  deleteUploadFile,
} from 'actions/upload-files';

const uploadFiles = () => {
  const initialState = {
    uploadFiles: null,
    selectedUploadFile: null,
  };

  return (state = initialState, { type, response }) => {
    switch (type) {
      case fetchUploadFiles.requestTypes.SUCCESS:
        return {
          selectedUploadFile: null,
          uploadFiles: response,
        };
      case addUploadFile.requestTypes.REQUEST:
        return {
          ...state,
          isSuccessful: false,
        };
      case addUploadFile.requestTypes.FAILURE:
        return {
          ...state,
          isSuccessful: false,
        };
      case addUploadFile.requestTypes.SUCCESS:
        return {
          ...state,
          selectedUploadFile: response,
          isSuccessful: true,
        };
      case updateUploadFile.requestTypes.REQUEST:
        return {
          ...state,
          isSuccessful: false,
        };
      case updateUploadFile.requestTypes.FAILURE:
        return {
          ...state,
          isSuccessful: false,
        };
      case updateUploadFile.requestTypes.SUCCESS:
        return {
          ...state,
          selectedUploadFile: response,
          isSuccessful: true,
        };
      case fetchOneUploadFile.requestTypes.SUCCESS:
        return {
          ...state,
          selectedUploadFile: response,
        };
      case deleteUploadFile.requestTypes.SUCCESS:
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

export default uploadFiles();
