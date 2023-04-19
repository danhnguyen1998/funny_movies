import { expressjwt } from 'express-jwt';
import util from 'util';

export { jwtMiddleware };

function jwtMiddleware(req, res) {
    const middleware = expressjwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] }).unless({
        path: [
            // public routes that don't require authentication
            '/api/users/create',
        ]
    });

    return util.promisify(middleware)(req, res);
}