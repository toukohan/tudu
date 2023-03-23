import jwt, { Secret } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const jwtSecret = process.env.JWT_SECRET as Secret;

export interface AuthenticatedRequest extends Request {
    user: any;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Invalid token' });
    
    jwt.verify(token, jwtSecret, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        (req as AuthenticatedRequest).user = user;
        next();
    });
}


// TODO: I haven't quite figured this out yet
export const refreshToken = (req: Request, res: Response, next: NextFunction) => {
    const refreshTokenInterval = 1000 * 60;

    const refreshTimer = setInterval(() => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            clearInterval(refreshTimer);
            return;
        }
        jwt.verify(token, jwtSecret, (err, user) => {
            if (err) {
                clearInterval(refreshTimer);
                return;
            }
            const newToken = jwt.sign({ sub: (req as AuthenticatedRequest).user._id }, jwtSecret, {expiresIn: '7d'});
            res.setHeader('Authorization', `Bearer ${newToken}`);
        });
    }, refreshTokenInterval);

    next();
    }