import { EUserType } from '@/interfaces/users.interface';
import { AdminApiGuardMiddleware } from '@/middlewares/admin.middleware';

describe('AdminApiGuardMiddleware', () => {
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

    AdminApiGuardMiddleware(mockReq, mockRes, mockNext);

    expect(mockNext).toBeCalled();
  });

  it('should throw error if user is not admin', () => {
    mockReq.user = { type: EUserType.USER };

    AdminApiGuardMiddleware(mockReq, mockRes, mockNext);

    expect(mockNext).toBeCalledWith(expect.any(Error));
  });

  it('should throw error if user is undefined', () => {
    AdminApiGuardMiddleware(mockReq, mockRes, mockNext);

    expect(mockNext).toBeCalledWith(expect.any(Error));
  });
});
