import { fetchBuilders, fetchOneBuilder, addBuilder, updateBuilder } from 'actions/builders';

import { createSelector } from 'reselect';
import createLoadingSelector from './create-loading-selector';
import createErrorSelector from './create-error-selector';

export const getBuilders = state => state.builders;
export const getBuildersState = createSelector(getBuilders, data =>
  data.builders ? data.builders : []
);

export const getSuccessState = createSelector(getBuilders, data => data.isSuccessful);
export const getSelectedBuilder = createSelector(getBuilders, data => data.selectedBuilder);

export const buildersValuesLoading = createLoadingSelector(fetchBuilders.actionName)();
export const buildersValuesError = createErrorSelector(fetchBuilders.actionName)();

export const getAddBuilderLoading = createLoadingSelector(addBuilder.actionName)();
export const getAddBuilderError = createErrorSelector(addBuilder.actionName)();

export const getUpdateBuilderLoading = createLoadingSelector(updateBuilder.actionName)();
export const getUpdateBuilderError = createErrorSelector(updateBuilder.actionName)();

export const getSelectedBuilderLoading = createLoadingSelector(fetchOneBuilder.actionName)();
export const getSelectedBuilderError = createErrorSelector(fetchOneBuilder.actionName)();
