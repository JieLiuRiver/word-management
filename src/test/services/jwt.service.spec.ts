import JwtService from '@/services/jwt.service';

describe('JwtService', () => {
  it('should sign and verify token', () => {
    const payload = { id: 1, name: 'testAccount' };
    const personalKey = 'secret';

    const token = JwtService.sign(payload, personalKey);

    const decoded = JwtService.verify(token, personalKey);
    expect(decoded).toMatchObject(payload);
  });

  it('should decode token payload', () => {
    const payload = { id: 1, name: 'testAccount' };
    const token = JwtService.sign(payload, 'key');

    const decodedPayload = JwtService.decodePayload(token);

    expect(decodedPayload).toMatchObject(payload);
  });

  it('should throw error if signature invalid', () => {
    const payload = { id: 1, name: 'testAccount' };
    const token = JwtService.sign(payload, 'key1');

    expect(() => {
      JwtService.verify(token, 'key2');
    }).toThrow();
  });
});
