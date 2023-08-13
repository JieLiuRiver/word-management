import { EUserType } from '@/interfaces/users.interface';
import { adminApiGuardMiddleware } from '@/middlewares/admin.middleware';

describe('adminApiGuardMiddleware', () => {
  let mockReq;
  let mockRes;
  let mockNext;

  beforeEach(() => {
    mockReq = {};
    mockRes = {};
    mockNext = jest.fn();
  });

  it('should call next if user is admin', () => {
    mockReq.user = { type: EUserType.ADMIN };

    adminApiGuardMiddleware(mockReq, mockRes, mockNext);

    expect(mockNext).toBeCalled();
  });

  it('should throw error if user is not admin', () => {
    mockReq.user = { type: EUserType.USER };

    adminApiGuardMiddleware(mockReq, mockRes, mockNext);

    expect(mockNext).toBeCalledWith(expect.any(Error));
  });

  it('should throw error if user is undefined', () => {
    adminApiGuardMiddleware(mockReq, mockRes, mockNext);

    expect(mockNext).toBeCalledWith(expect.any(Error));
  });
});
