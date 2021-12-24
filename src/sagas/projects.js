import { call, takeLatest, put, select } from 'redux-saga/effects';
import {
  fetchProjects,
  fetchOneProject,
  addProject,
  updateProject,
  deleteProject,
} from 'actions/projects';
import {
  fetchAllProjectsApi,
  fetchOneProjectApi,
  addProjectApi,
  updateProjectApi,
  deleteProjectApi,
} from 'services/projects';
import fetchEntity from './fetch-entity';

const fetchProjectsData = fetchEntity.bind(null, fetchProjects.actions, fetchAllProjectsApi);

const fetchProjectData = fetchEntity.bind(null, fetchOneProject.actions, fetchOneProjectApi);

const fetchAddProject = fetchEntity.bind(null, addProject.actions, addProjectApi);

const fetchUpdateProject = fetchEntity.bind(null, updateProject.actions, updateProjectApi);

const fetchDeleteProject = fetchEntity.bind(null, deleteProject.actions, deleteProjectApi);

export function* loadFetchProjects({ params }) {
  yield call(fetchProjectsData, { ...params });
}

export function* loadGetProject({ params }) {
  yield put(fetchOneProject.actions.failure({}, undefined));
  yield call(fetchProjectData, params);
}

export function* loadAddProject({ params }) {
  yield call(fetchAddProject, params);
}

export function* loadUpdateProject({ params }) {
  yield call(fetchUpdateProject, params);
}

export function* loadDeleteProject({ params }) {
  yield call(fetchDeleteProject, { ...params });
}

function* watchFetchProjects() {
  yield takeLatest(fetchProjects.actionName, loadFetchProjects);
}

function* watchAddProject() {
  yield takeLatest(addProject.actionName, loadAddProject);
}

function* watchUpdateProject() {
  yield takeLatest(updateProject.actionName, loadUpdateProject);
}

function* watchDeleteProject() {
  yield takeLatest(deleteProject.actionName, loadDeleteProject);
}

function* watchGetProject() {
  yield takeLatest(fetchOneProject.actionName, loadGetProject);
}

export function* loadProjectsOnChange({ params }) {
  const projects = yield select(state => state.projects);
  const { total, skip, limit } = projects;
  if (skip && skip >= total) {
    yield call(fetchProjectsData, {
      $skip: total - Math.max(total % limit, limit),
      '$sort[updatedAt]': -1,
    });
  } else {
    yield call(fetchProjectsData, { $skip: skip, '$sort[updatedAt]': -1 });
  }
}

function* watchProjectsOnChange() {
  yield takeLatest([deleteProject.requestTypes.SUCCESS], loadProjectsOnChange);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  watchFetchProjects,
  watchAddProject,
  watchGetProject,
  watchUpdateProject,
  watchProjectsOnChange,
  watchDeleteProject,
};
