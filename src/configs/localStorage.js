export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
};

export const saveState = state => {
  try {
    const { user } = state;
    if (user.user.loggedInUser.jwt) {
      const serializedState = JSON.stringify({
        user,
      });
      localStorage.setItem('state', serializedState);
    }
  } catch (e) {
    // ignore errors
  }
};

export const emptyState = () => {
  localStorage.removeItem('state');
};

export const getAccessToken = () => {
  const state = loadState();
  return (
    (state &&
      state.user &&
      state.user.user &&
      state.user.user.loggedInUser &&
      state.user.user.loggedInUser.jwt) ||
    ''
  );
};

export const saveFirstLogin = () => {
  const serialized = JSON.stringify({
    loggedInUser: true,
  });

  localStorage.setItem('info', serialized);
};

export const loadFirstLogin = () => {
  try {
    const serializedState = localStorage.getItem('info');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
};
