const Config = require('../config/environment');
const application = require('../src/app');

const app = application(Config);

app.listen(Config.port, () => console.log(`Listening on ${Config.port}`));
