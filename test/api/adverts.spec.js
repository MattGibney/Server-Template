const sinon = require('sinon');
const { assert } = require('chai');
const supertest = require('supertest');
const application = require('../../src/app');

describe('API: Adverts', function () {
  describe('GET /adverts', function () {
    it('serves the correct response', async function () {
      const app = application(
        // @ts-ignore
        {
          version: '',
          corsOriginWhitelist: [],
        },
        {
          advert: {
            fetchAll: sinon.stub().resolves([
              {
                id: 1111,
                status: 'boosting',
                jobRef: 'REF',
                jobTitle: 'TITLE',
                jobLocation: 'LOCATION',
                viewEvents: 2222,
                applyEvents: 3333,
              },
            ]),
          },
        }
      );

      const response = await supertest(app).get('/adverts');

      assert.equal(response.status, 200);
      assert.deepEqual(response.body, {
        data: [
          {
            attributes: {
              'apply-events': 3333,
              'job-location': 'LOCATION',
              'job-ref': 'REF',
              'job-title': 'TITLE',
              status: 'boosting',
              'view-events': 2222,
            },
            id: 1111,
            type: 'advert',
          },
        ],
      });
    });
  });
});
