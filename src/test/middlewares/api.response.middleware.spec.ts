import { ERROR_RESPONSE_CODE, SUCCESS_RESPONSE_CODE } from '@/constants';
import apiResponseMiddleware from '@/middlewares/api.response.middleware';

describe('apiResponseMiddleware', () => {
  let mockReq;
  let mockRes;
  let mockNext;

  beforeEach(() => {
    mockReq = {};
    mockRes = {
      status: jest.fn(() => mockRes),
      json: jest.fn(),
    };
    mockNext = jest.fn();
  });

  it('should add apiSuccess method to response', () => {
    apiResponseMiddleware(mockReq, mockRes, mockNext);

    mockRes.apiSuccess();

    expect(mockRes.status).toBeCalledWith(200);
    expect(mockRes.json).toBeCalledWith({
      data: null,
      code: SUCCESS_RESPONSE_CODE,
    });
  });

  it('should add apiError method to response', () => {
    apiResponseMiddleware(mockReq, mockRes, mockNext);

    mockRes.apiError('Error message');

    expect(mockRes.status).toBeCalledWith(200);
    expect(mockRes.json).toBeCalledWith({
      data: null,
      code: ERROR_RESPONSE_CODE,
      message: 'Error message',
    });
  });

  it('should call next', () => {
    apiResponseMiddleware(mockReq, mockRes, mockNext);

    expect(mockNext).toBeCalled();
  });
});
