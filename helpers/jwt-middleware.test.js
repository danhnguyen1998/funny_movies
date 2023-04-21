import { jwtMiddleware } from './jwt-middleware';
import jwt from 'jsonwebtoken';

describe('jwtMiddleware', () => {
  let req, res;
  const token = jwt.sign({ sub: '12345' }, process.env.JWT_SECRET, { expiresIn: '5m' });

  beforeEach(() => {
    req = {
      headers: {
        Authorization: `Bearer ${token}`
      },
      url: '/api/users/12345'
    };

    res = {
      send: jest.fn()
    };
  });

  it('should allow access to public routes without authentication', async () => {
    req.url = '/api/users/create';

    await jwtMiddleware(req, res);

    expect(res.send).not.toHaveBeenCalled();
  });
});
