import { createSelector } from 'reselect';

const getError = state => state.error;

// eslint-disable-next-line import/no-anonymous-default-export
export default loadActionType => params =>
  createSelector(
    getError,
    error => error[`${loadActionType}${params ? `_${JSON.stringify(params)}` : ''}`]
  );
