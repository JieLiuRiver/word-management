import createInputValidationMiddleware from '@/middlewares/input-validator.middlware';

describe('Input validator middleware', () => {
  const middleware = createInputValidationMiddleware('user_input');

  it('should allow valid input', () => {
    const req = {
      body: {
        user_input: 'John',
      },
    };

    const res: any = {
      apiError: jest.fn((message: string, code?: number) => null),
    };

    middleware(req, res, jest.fn());

    expect(res.apiError).not.toHaveBeenCalled();
  });
});
