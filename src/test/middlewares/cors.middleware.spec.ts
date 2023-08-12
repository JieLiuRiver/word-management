import cors from '@/middlewares/cors.middleware';

describe('CORS middleware', () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = {
      method: 'GET',
    };

    res = {
      set: jest.fn(),
      status: jest.fn(() => res),
      end: jest.fn(),
    };

    next = jest.fn();
  });

  it('should set CORS headers for any origin', () => {
    cors({})(req, res, next);

    expect(res.set).toHaveBeenCalledWith('Access-Control-Allow-Origin', '*');
  });

  it('should set specified origin header', () => {
    cors({ origin: 'https://example.com' })(req, res, next);

    expect(res.set).toHaveBeenCalledWith('Access-Control-Allow-Origin', 'https://example.com');
  });

  it('should set credentials header if enabled', () => {
    cors({ credentials: true })(req, res, next);

    expect(res.set).toHaveBeenCalledWith('Access-Control-Allow-Credentials', 'true');
  });

  it('should handle preflight request', () => {
    req.method = 'OPTIONS';

    cors({})(req, res, next);

    expect(res.set).toHaveBeenCalledWith('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.end).toHaveBeenCalled();
  });

  it('should call next for normal request', () => {
    cors({})(req, res, next);

    expect(next).toHaveBeenCalled();
  });
});
