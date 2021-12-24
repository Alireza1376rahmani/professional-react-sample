import {
  fetchUploadFiles,
  fetchOneUploadFile,
  addUploadFile,
  updateUploadFile,
} from 'actions/upload-files';

import { createSelector } from 'reselect';
import createLoadingSelector from './create-loading-selector';
import createErrorSelector from './create-error-selector';

export const getUploadFiles = state => state.uploadFiles;
export const getUploadFilesState = createSelector(getUploadFiles, data =>
  data.uploadFiles ? data.uploadFiles : []
);

export const getSuccessState = createSelector(getUploadFiles, data => data.isSuccessful);
export const getSelectedUploadFile = createSelector(
  getUploadFiles,
  data => data.selectedUploadFile
);

export const uploadFilesValuesLoading = createLoadingSelector(fetchUploadFiles.actionName)();
export const uploadFilesValuesError = createErrorSelector(fetchUploadFiles.actionName)();

export const getAddUploadFileLoading = createLoadingSelector(addUploadFile.actionName)();
export const getAddUploadFileError = createErrorSelector(addUploadFile.actionName)();

export const getUpdateUploadFileLoading = createLoadingSelector(updateUploadFile.actionName)();
export const getUpdateUploadFileError = createErrorSelector(updateUploadFile.actionName)();

export const getSelectedUploadFileLoading = createLoadingSelector(fetchOneUploadFile.actionName)();
export const getSelectedUploadFileError = createErrorSelector(fetchOneUploadFile.actionName)();
