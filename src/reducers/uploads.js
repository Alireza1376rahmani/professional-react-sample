// eslint-disable-next-line import/no-anonymous-default-export
export default (state = {}, action) => {
  const { type, files, deletedFileId } = action;
  const matches = /UPLOADS_SUCCESS$/.test(type);

  if (!matches) return state;

  // ADD upload case
  if (/^ADD_/.test(type)) {
    return {
      ...state,
      [`LOAD_${type.slice(0, -8)}`]: files,
    };
  }

  // DELETE upload case
  if (/^DELETE/.test(type)) {
    const { [`LOAD_ADD_${type.slice(0, -8).slice(7)}`]: oldFiles, ...oldState } = state;
    return {
      ...oldState,
      [`LOAD_ADD_${type.slice(0, -8).slice(7)}`]: oldFiles
        ? oldFiles.filter(file => file.uid !== deletedFileId)
        : [],
    };
  }

  return state;
};
