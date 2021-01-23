const { assert } = require('chai');
const sinon = require('sinon');
const AdvertModel = require('../../../src/models/advert');

describe('Model: Advert', function () {
  describe('constructor', function () {
    it('correctly assigns all properties', function () {
      const mockModelFactory = sinon.stub();
      const mockDaoFactory = sinon.stub();
      const mockLogger = sinon.stub();

      const advert = new AdvertModel(
        // @ts-ignore
        mockModelFactory,
        mockDaoFactory,
        mockLogger,
        {
          id: 1,
          status: 'boosting',
          jobRef: '3',
          jobTitle: '4',
          jobLocation: '5',
          viewEvents: 6,
          applyEvents: 7,
        }
      );

      // @ts-ignore
      assert.deepEqual(advert.ModelFactory, mockModelFactory);
      // @ts-ignore
      assert.deepEqual(advert.DaoFactory, mockDaoFactory);
      // @ts-ignore
      assert.deepEqual(advert.Logger, mockLogger);

      assert.equal(advert.id, 1);
      assert.equal(advert.status, 'boosting');
      assert.equal(advert.jobRef, '3');
      assert.equal(advert.jobTitle, '4');
      assert.equal(advert.jobLocation, '5');
      assert.equal(advert.viewEvents, 6);
      assert.equal(advert.applyEvents, 7);
    });
  });
  describe('Static Methods', function () {
    describe('(getter) JSONAPIMapper', function () {
      it('returns the mapper object', function () {
        const expected = {
          id: 'id',
          type: 'advert',
          attributes: {
            status: 'status',
            'job-ref': 'jobRef',
            'job-title': 'jobTitle',
            'job-location': 'jobLocation',
            'view-events': 'viewEvents',
            'apply-events': 'applyEvents',
          },
        };
        assert.deepEqual(AdvertModel.JSONAPIMapper, expected);
      });
    });
    describe('fetchAll', function () {
      it('Returns null when the advertDao fails', async function () {
        const mockDaoFactory = {
          advert: {
            fetchAll: sinon.stub().resolves(null),
          },
        };
        const mockLogger = {
          warn: sinon.stub(),
        };
        const adverts = await AdvertModel.fetchAll(
          // @ts-ignore
          {},
          mockDaoFactory,
          mockLogger
        );

        assert.isNull(adverts);

        sinon.assert.calledWith(mockLogger.warn, 'AdvertDao failed to return');
      });
      it('Returns an array of AdvertModels', async function () {
        const mockDaoFactory = {
          advert: {
            fetchAll: sinon.stub().resolves([{}]),
          },
        };
        const adverts = await AdvertModel.fetchAll(
          // @ts-ignore
          {},
          mockDaoFactory,
          {}
        );

        assert.instanceOf(adverts[0], AdvertModel);
      });
    });
  });
});
