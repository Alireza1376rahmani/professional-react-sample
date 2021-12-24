import { fetchProjects, fetchOneProject, addProject, updateProject } from 'actions/projects';

import { createSelector } from 'reselect';
import createLoadingSelector from './create-loading-selector';
import createErrorSelector from './create-error-selector';

export const getProjects = state => state.projects;
export const getProjectsState = createSelector(getProjects, data =>
  data.projects ? data.projects : []
);

export const getSuccessState = createSelector(getProjects, data => data.isSuccessful);
export const getSelectedProject = createSelector(getProjects, data => data.selectedProject);

export const projectsValuesLoading = createLoadingSelector(fetchProjects.actionName)();
export const projectsValuesError = createErrorSelector(fetchProjects.actionName)();

export const getAddProjectLoading = createLoadingSelector(addProject.actionName)();
export const getAddProjectError = createErrorSelector(addProject.actionName)();

export const getUpdateProjectLoading = createLoadingSelector(updateProject.actionName)();
export const getUpdateProjectError = createErrorSelector(updateProject.actionName)();

export const getSelectedProjectLoading = createLoadingSelector(fetchOneProject.actionName)();
export const getSelectedProjectError = createErrorSelector(fetchOneProject.actionName)();
