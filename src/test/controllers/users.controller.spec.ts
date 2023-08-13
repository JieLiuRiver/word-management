import { UsersController } from '@/controllers/users.controller';
import UsersModel from '@/models/users.model';

jest.mock('@/models/users.model', () => {
  class Model {
    getUserById;
    getUsers;
    constructor() {
      this.getUserById = jest.fn(() => ({
        id: 1,
        name: 'Mary',
      }));
      this.getUsers = jest.fn(() => [{ id: 1, name: 'Mary' }]);
    }
  }
  return Model;
});

describe('UsersController', () => {
  let controller, model;

  beforeEach(() => {
    controller = new UsersController();
    model = new UsersModel();
  });

  it('should return user info by userid', async () => {
    const req = { params: { id: 1 } };
    const res = { apiSuccess: jest.fn() };

    await controller.getUserById(
      req,
      res,
      jest.fn(() => null),
    );

    expect(res.apiSuccess).toBeCalledWith({
      id: 1,
      name: 'Mary',
    });
  });

  it('should get users successfully', async () => {
    const req = {};
    const res = { apiSuccess: jest.fn() };

    await controller.getUsers(
      req,
      res,
      jest.fn(() => null),
    );

    expect(res.apiSuccess).toBeCalledWith([{ id: 1, name: 'Mary' }]);
  });
});
