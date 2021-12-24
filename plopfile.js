module.exports = plop => {
  plop.setPartial('fetchAllActionName', 'fetch{{pascalCase name}}');
  plop.setPartial('fetchOneActionName', 'fetchOne{{pascalCase singularName}}');
  plop.setPartial('addActionName', 'add{{pascalCase singularName}}');
  plop.setPartial('updateActionName', 'update{{pascalCase singularName}}');
  plop.setPartial('deleteActionName', 'delete{{pascalCase singularName}}');

  plop.setPartial('fetchAllServiceName', 'fetchAll{{pascalCase name}}Api');
  plop.setPartial('fetchOneServiceName', 'fetchOne{{pascalCase singularName}}Api');
  plop.setPartial('addServiceName', 'add{{pascalCase singularName}}Api');
  plop.setPartial('updateServiceName', 'update{{pascalCase singularName}}Api');
  plop.setPartial('deleteServiceName', 'delete{{pascalCase singularName}}Api');

  plop.setGenerator('component', {
    description: 'Create a component',
    // User input prompts provided as arguments to the template
    prompts: [
      {
        // Raw text input
        type: 'input',
        // Variable name for this input
        name: 'name',
        // Prompt to display on command line
        message: 'What is your component name?',
      },
    ],
    actions: [
      {
        // Add a new file
        type: 'add',
        // Path for the new file
        path: 'src/components/{{pascalCase name}}/index.js',
        // Handlebars template used to generate content of new file
        templateFile: 'plop-templates/Component/Component.js.hbs',
      },
      {
        // Adds an index.js file if it does not already exist
        type: 'add',
        path: 'src/components/Index.js',
        templateFile: 'plop-templates/injectable-index.js.hbs',
        // If Index.js already exists in this location, skip this action
        skipIfExists: true,
      },
      {
        // Action type 'append' injects a template into an existing file
        type: 'append',
        path: 'src/components/Index.js',
        // Pattern tells plop where in the file to inject the template
        pattern: `/* PLOP_INJECT_IMPORT */`,
        template: `export default as {{pascalCase name}} from './{{pascalCase name}}';`,
      },
    ],
  });
  plop.setGenerator('redux-saga', {
    description: 'Create redux and saga all files',
    prompts: [
      {
        // Raw text input
        type: 'input',
        // Variable name for this input
        name: 'name',
        // Prompt to display on command line
        message: 'What is your entity name?',
      },
      {
        // Raw text input
        type: 'input',
        // Variable name for this input
        name: 'singularName',
        // Prompt to display on command line
        message: 'What is your entity singular name?',
      },
    ],
    actions: [
      {
        // Add a new file
        type: 'add',
        // Path for the new file
        path: 'src/actions/{{kebabCase name}}.js',
        // Handlebars template used to generate content of new file
        templateFile: 'plop-templates/redux/action.js.hbs',
      },
      {
        // Add a new file
        type: 'add',
        // Path for the new file
        path: 'src/reducers/{{kebabCase name}}.js',
        // Handlebars template used to generate content of new file
        templateFile: 'plop-templates/redux/reducer.js.hbs',
      },
      {
        type: 'append',
        path: 'src/reducers/Index.js',
        pattern: `/* PLOP_INJECT_IMPORT */`,
        template: `import {{camelCase name}} from './{{kebabCase name}}';`,
      },
      {
        type: 'append',
        path: 'src/reducers/index.js',
        pattern: `/* PLOP_INJECT_EXPORT */`,
        template: `  {{camelCase name}},`,
      },
      {
        type: 'add',
        path: 'src/sagas/{{kebabCase name}}.js',
        templateFile: 'plop-templates/redux/saga.js.hbs',
      },
      {
        type: 'append',
        path: 'src/sagas/index.js',
        pattern: `/* PLOP_INJECT_IMPORT */`,
        template: `import {{camelCase name}} from './{{kebabCase name}}';`,
      },
      {
        type: 'append',
        path: 'src/sagas/index.js',
        pattern: `/* PLOP_INJECT_EXPORT */`,
        template: `  ...{{camelCase name}},`,
      },
      {
        type: 'add',
        path: 'src/selectors/{{kebabCase name}}.js',
        templateFile: 'plop-templates/redux/selector.js.hbs',
      },
      {
        type: 'add',
        path: 'src/services/{{kebabCase name}}.js',
        templateFile: 'plop-templates/redux/service.js.hbs',
      },
    ],
  });
};
