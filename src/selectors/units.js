import { fetchUnits, fetchOneUnit, addUnit, updateUnit } from 'actions/units';

import { createSelector } from 'reselect';
import createLoadingSelector from './create-loading-selector';
import createErrorSelector from './create-error-selector';

export const getUnits = state => state.units;
export const getUnitsState = createSelector(getUnits, data => (data.units ? data.units : []));

export const getSuccessState = createSelector(getUnits, data => data.isSuccessful);
export const getSelectedUnit = createSelector(getUnits, data => data.selectedUnit);

export const unitsValuesLoading = createLoadingSelector(fetchUnits.actionName)();
export const unitsValuesError = createErrorSelector(fetchUnits.actionName)();

export const getAddUnitLoading = createLoadingSelector(addUnit.actionName)();
export const getAddUnitError = createErrorSelector(addUnit.actionName)();

export const getUpdateUnitLoading = createLoadingSelector(updateUnit.actionName)();
export const getUpdateUnitError = createErrorSelector(updateUnit.actionName)();

export const getSelectedUnitLoading = createLoadingSelector(fetchOneUnit.actionName)();
export const getSelectedUnitError = createErrorSelector(fetchOneUnit.actionName)();
