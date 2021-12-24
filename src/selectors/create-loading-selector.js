import { createSelector } from 'reselect';

const getLoading = state => state.loading;

// eslint-disable-next-line import/no-anonymous-default-export
export default loadActionType => params =>
  createSelector(
    getLoading,
    loading => loading[`${loadActionType}${params ? `_${JSON.stringify(params)}` : ''}`]
  );
