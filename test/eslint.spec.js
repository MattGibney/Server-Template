const lint = require('mocha-eslint');

const paths = ['src/**/*.js', 'config/**/*'];
const options = {
  strict: true,
};

lint(paths, options);
