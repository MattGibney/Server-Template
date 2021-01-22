const sinon = require('sinon');

const controller = require('../../../src/controllers/healthcheck');

describe('Controller: Healthcheck', function () {
  it('resolves a 200 request with the current version', async function () {
    const mockReq = {
      Config: {
        version: 'VERSION_NUMBER',
      },
    };
    const mockResStatus = sinon.stub();
    const mockResJson = sinon.stub();
    const mockRes = {
      status: mockResStatus.returns({
        json: mockResJson,
      }),
    };

    // @ts-ignore - Purposefully mocking only what is required for test
    await controller.healthcheck(mockReq, mockRes);

    sinon.assert.calledWith(mockResStatus, 200);
    sinon.assert.calledWith(mockResJson, { version: 'VERSION_NUMBER' });
  });
});
