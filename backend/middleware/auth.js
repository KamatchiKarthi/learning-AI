import jwt  from 'jsonwebtoken';
import User from '../model/user.js';

const protect = async (req, res, next) => {
    let token;

    //check token if exists in authorization header
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];

            //verification
            const decodeVal = jwt.verify(
                token,
                process.env.JWT_SECRET 
            );
            if (typeof decodeVal === 'string') {
                throw new Error('Invalid token');
            }
            req.user = await User.findById(decodeVal.id).select('-password');

            if (!req.user) {
                return res.status(401).json({
                    success: false,
                    error: 'User Not Found',
                    statusCode: 401,
                });
            }
            next();
        } catch (error) {
            console.error('Auth middleware error:', error.message);

            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({
                    success: false,
                    error: 'Token has expired',
                    statusCode: 401,
                });
            }
            return res.status(401).json({
                success: false,
                error: 'Not authorized, token failed',
                statusCode: 401,
            });
        }
    }

    if (!token) {
        return res.status(401).json({
            success: false,
            error: 'Not authorized, no token',
            statusCode: 401,
        });
    }
};

export default protect;
