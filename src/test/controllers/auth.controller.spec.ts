import { AuthController } from '@/controllers/auth.controller';
import UserModel from '@/models/users.model';
import jwtService from '@/services/jwt.service';

jest.mock('@/models/users.model', () => {
  class Model {
    findUserByName;
    updateUserPersonalkey;
    constructor() {
      this.findUserByName = jest.fn(() => ({
        id: 1,
        name: 'test',
      }));
      this.updateUserPersonalkey = jest.fn(() => Promise.resolve());
    }
  }
  return Model;
});

describe('AuthController', () => {
  let controller, userModel;

  beforeEach(() => {
    controller = new AuthController();
    userModel = new UserModel();
  });

  describe('login', () => {
    it('should return token on successful login', async () => {
      const mockUser = {
        id: 1,
        name: 'test',
        personalKey: '1234',
      };

      userModel.findUserByName = jest.fn().mockResolvedValue(mockUser);
      jwtService.sign = jest.fn().mockReturnValue('token');

      const req = { body: { username: 'test' } };
      const res = { apiSuccess: jest.fn() };

      await controller.logIn(req, res);

      expect(res.apiSuccess).toBeCalledWith({
        token: 'token',
        userInfo: {
          id: 1,
          name: 'test',
          type: undefined,
        },
      });
    });
  });

  describe('revokeToken', () => {
    it('should revoke token', async () => {
      const mockUser = { username: 'test' };

      userModel.updateUserPersonalkey = jest.fn();

      const req = { body: mockUser };
      const res = { apiSuccess: jest.fn() };

      await controller.revokeToken(req, res);

      expect(res.apiSuccess).toBeCalled();
    });
  });
});
