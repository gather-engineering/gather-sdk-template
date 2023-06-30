module.exports = [
  {
    type: 'input',
    name: 'name',
    message: "What's name of data source?",
  },
  {
    type: 'select',
    name: 'importMediatorType',
    message: 'What type of import mediator do you want to use?',
    choices: ['direct', 'serviceWorker'],
  },
  {
    type: 'select',
    name: 'dataSourceFlowType',
    message: 'What flow of data source do you want to use, import or upload?',
    choices: ['import', 'upload'],
  },
];
