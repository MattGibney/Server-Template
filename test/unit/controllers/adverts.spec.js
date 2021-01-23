// const { assert } = require('chai');
const sinon = require('sinon');

const AdvertController = require('../../../src/controllers/adverts');

describe('Controller: Advert', function () {
  describe('fetchAll', function () {
    it('returns an empty JSONAPI array when there are no adverts', async function () {
      const mockReq = {
        ModelFactory: {
          advert: {
            JSONAPIMapper: {},
            fetchAll: sinon.stub().resolves([]),
          },
        },
        DaoFactory: sinon.stub(),
        Logger: sinon.stub(),
      };
      const mockStatus = sinon.stub();
      const mockJson = sinon.stub();
      const mockRes = {
        status: mockStatus.returns({
          json: mockJson,
        }),
      };

      // @ts-ignore
      await AdvertController.fetchAll(mockReq, mockRes);

      sinon.assert.calledWith(
        mockReq.ModelFactory.advert.fetchAll,
        mockReq.ModelFactory,
        mockReq.DaoFactory,
        mockReq.Logger
      );

      sinon.assert.calledWith(mockStatus, 200);
      sinon.assert.calledWith(mockJson, { data: [] });
    });
    it('returns a JSONAPI array when there are adverts', async function () {
      const mockReq = {
        ModelFactory: {
          advert: {
            JSONAPIMapper: {
              id: 'id',
              type: 'adverts',
            },
            fetchAll: sinon.stub().resolves([{ id: 111 }]),
          },
        },
        DaoFactory: sinon.stub(),
        Logger: sinon.stub(),
      };
      const mockStatus = sinon.stub();
      const mockJson = sinon.stub();
      const mockRes = {
        status: mockStatus.returns({
          json: mockJson,
        }),
      };

      // @ts-ignore
      await AdvertController.fetchAll(mockReq, mockRes);

      sinon.assert.calledWith(
        mockReq.ModelFactory.advert.fetchAll,
        mockReq.ModelFactory,
        mockReq.DaoFactory,
        mockReq.Logger
      );

      sinon.assert.calledWith(mockStatus, 200);
      sinon.assert.calledWith(mockJson, {
        data: [{ id: 111, type: 'adverts' }],
      });
    });
  });
});
