const extensionsConfig = require('./webpack/webpack-extensions.config');

if(extensionsConfig.length === 0){
  console.warn('You have to have at least one widget/theme/template.');
  return;
}
module.exports = extensionsConfig;