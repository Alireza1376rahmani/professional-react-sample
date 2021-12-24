import { makeRequestAction } from './index';

export const notifyUser = makeRequestAction('NOTIFY_USER', {
  onSuccess(params, response) {
    return {
      response: {
        ...response,
      },
    };
  },
});
