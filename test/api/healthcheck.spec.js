const { assert } = require('chai');
const supertest = require('supertest');
const application = require('../../src/app');

describe('API: Healthcheck', function () {
  describe('GET /healthcheck', function () {
    it('serves the correct response', async function () {
      const app = application({ version: 'VERSION_NUMBER' });

      const response = await supertest(app).get('/healthcheck');

      assert.exists(response.headers['x-request-id']);
      assert.equal(response.status, 200);
      assert.equal(response.body.version, 'VERSION_NUMBER');
    });
  });
});
