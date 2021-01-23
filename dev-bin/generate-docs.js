const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const openapiJSDoc = require('openapi-jsdoc');
const pkg = require('../package.json');

(async () => {
  const appRoot = path.resolve(__dirname, '../');

  console.log(chalk.green('Generating docs...'));

  const api = await openapiJSDoc({
    definition: {
      // info object, see https://swagger.io/specification/#infoObject
      info: {
        title: pkg.name, // required
        version: pkg.version, // required
        description: pkg.description,
      },
    },
    // Paths to the API docs
    apis: [`${appRoot}/src/controllers/**/*.js`],
  });

  await fs.promises.writeFile(
    `${appRoot}/docs/swagger.json`,
    JSON.stringify(api, null, 2)
  );
  console.log(chalk.green(`Docs written to ${appRoot}/docs/swagger.json`));
})();
