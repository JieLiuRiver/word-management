import { AuthMiddleware } from '@/middlewares/auth.middleware';
import jwtService from '@/services/jwt.service';
import UserModel from '@/models/users.model';

jest.mock('@/models/users.model', () => {
  class Model {
    findUserByName;
    constructor() {
      this.findUserByName = jest.fn(() => ({
        id: 1,
        name: 'test',
      }));
    }
  }
  return Model;
});

describe('AuthMiddleware', () => {
  let mockReq;
  let mockRes;
  let mockNext;
  let model;

  beforeEach(() => {
    mockReq = {};
    mockRes = {};
    mockNext = jest.fn();
    model = new UserModel();
  });

  it('should call next if token is valid', async () => {
    mockReq.header = (string: 'Authorization') => 'Bearer token';

    jwtService.decodePayload = jest.fn(() => ({ id: 1, name: 'test' }));
    jwtService.verify = jest.fn();

    await AuthMiddleware(mockReq, mockRes, mockNext);

    expect(mockNext).toHaveBeenCalled();
    expect(mockReq.user).toEqual({ id: 1, name: 'test' });
  });

  it('should throw error if token is invalid', async () => {
    mockReq.headers = {
      Authorization: 'Bearer token',
    };

    jwtService.verify = jest.fn(() => {
      throw new Error('Invalid token');
    });

    await AuthMiddleware(mockReq, mockRes, mockNext);

    expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
  });
});
