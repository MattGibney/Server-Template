const { assert } = require('chai');
const supertest = require('supertest');
const application = require('../../src/app');

describe('API: Healthcheck', function () {
  describe('GET /healthcheck', function () {
    it('serves the correct response', async function () {
      // @ts-ignore
      const app = application({
        version: 'VERSION_NUMBER',
        corsOriginWhitelist: [],
      });

      const response = await supertest(app).get('/healthcheck');

      assert.exists(response.headers['x-request-id']);
      assert.equal(response.status, 200);
      assert.equal(response.body.version, 'VERSION_NUMBER');
    });
    it('Has CORS support', async function () {
      // @ts-ignore
      const app = application({
        version: 'VERSION_NUMBER',
        corsOriginWhitelist: [],
      });

      const response = await supertest(app)
        .get('/healthcheck')
        .set('Origin', 'http://DOMAIN');

      assert.equal(response.status, 500);
      assert.deepEqual(response.body, {
        error: 'CORS request from untrusted origin',
      });
    });
  });
});
