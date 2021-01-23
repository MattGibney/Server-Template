const { assert } = require('chai');
const AdvertDao = require('../../../src/daos/adverts');

describe('Dao: Advert', function () {
  describe('fetchAll', function () {
    it('returns an array of advertData', async function () {
      const dao = new AdvertDao();

      const adverts = await dao.fetchAll();

      // This test is using the mock data hardcoded into the Dao.
      assert.deepEqual(adverts, [
        {
          id: 1,
          status: 'boosting',
          jobRef: 'accman001',
          jobTitle: 'Account Manager',
          jobLocation: 'London, England',
          viewEvents: 100,
          applyEvents: 15,
        },
      ]);
    });
  });
});
