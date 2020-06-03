const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');

const getEnvVars = (env) => {
  const currentPath = path.join(__dirname);

  // when in development, .env is in parent dir
  const basePath = currentPath + '/../.env';

  const envPath = basePath + '.' + env;

  // Check if the file exists, otherwise fall back to the production .env
  const finalPath = fs.existsSync(envPath) ? envPath : basePath;

  // Set the path parameter in the dotenv config
  const fileEnv = dotenvExpand(dotenv.config({ path: finalPath })).parsed;

  return fileEnv;
};

module.exports = getEnvVars(process.env.NODE_ENV);