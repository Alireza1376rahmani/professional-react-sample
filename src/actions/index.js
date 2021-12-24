export const REQUEST = 'REQUEST';
export const SUCCESS = 'SUCCESS';
export const FAILURE = 'FAILURE';

// creates request types for `base` action
export const createRequestTypes = base =>
  [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
    acc[type] = `${base}_${type}`;
    return acc;
  }, {});

export const action = (type, payload = {}) => ({ type, ...payload });

export const makeRequestAction = (name, options) => new GenerateAction(name, options);

export const makeAction = name => new GenerateAction(name, { advanced: false });

class GenerateAction {
  constructor(name, options) {
    if (!name) {
      throw Error('Action Name must be specified');
    }
    this.name = name;
    this.options = options || {};
    this.options.advanced = this.options.advanced == null ? true : this.options.advanced;
    this.requestTypes = createRequestTypes(this.name);
    return this.generate();
  }

  get loadActionName() {
    return this.options.advanced ? `LOAD_${this.name}` : this.name;
  }

  get cancelActionName() {
    return `${this.loadActionName}_CANCEL`;
  }

  // eslint-disable-next-line class-methods-use-this
  onFailure(params, error) {
    return {
      error,
    };
  }

  // eslint-disable-next-line class-methods-use-this
  onSuccess(params, response) {}

  create = () => ({
    request: ({ params }) => action(this.requestTypes[REQUEST], params),
    success: ({ params }, response) =>
      action(
        this.requestTypes[SUCCESS],
        // eslint-disable-next-line no-prototype-builtins
        this.options.hasOwnProperty('onSuccess')
          ? this.options.onSuccess(params, response)
          : this.onSuccess(params, response)
      ),
    failure: ({ params }, error) =>
      action(
        this.requestTypes[FAILURE],
        // eslint-disable-next-line no-prototype-builtins
        this.options.hasOwnProperty('onFailure')
          ? this.options.onFailure(params, error)
          : this.onFailure(params, error)
      ),
  });

  generate = () => ({
    actionName: this.loadActionName,
    requestTypes: this.options.advanced ? this.requestTypes : {},
    actions: this.options.advanced ? this.create() : {},
    request: (data = {}) => {
      const params = Array.isArray(data) ? [...data] : { ...data };
      return action(this.loadActionName, {
        params,
      });
    },
    cancelActionName: this.cancelActionName,
    cancel: () => action(this.cancelActionName),
  });
}
