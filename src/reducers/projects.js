import {
  fetchProjects,
  fetchOneProject,
  addProject,
  updateProject,
  deleteProject,
} from 'actions/projects';

const projects = () => {
  const initialState = {
    projects: null,
    selectedProject: null,
  };

  return (state = initialState, { type, response }) => {
    switch (type) {
      case fetchProjects.requestTypes.SUCCESS:
        return {
          selectedProject: null,
          projects: response,
        };
      case addProject.requestTypes.REQUEST:
        return {
          ...state,
          isSuccessful: false,
        };
      case addProject.requestTypes.FAILURE:
        return {
          ...state,
          isSuccessful: false,
        };
      case addProject.requestTypes.SUCCESS:
        return {
          ...state,
          selectedProject: response,
          isSuccessful: true,
        };
      case updateProject.requestTypes.REQUEST:
        return {
          ...state,
          isSuccessful: false,
        };
      case updateProject.requestTypes.FAILURE:
        return {
          ...state,
          isSuccessful: false,
        };
      case updateProject.requestTypes.SUCCESS:
        return {
          ...state,
          selectedProject: response,
          isSuccessful: true,
        };
      case fetchOneProject.requestTypes.SUCCESS:
        return {
          ...state,
          selectedProject: response,
        };
      case deleteProject.requestTypes.SUCCESS:
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

export default projects();
