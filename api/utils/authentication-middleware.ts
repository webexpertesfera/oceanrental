import { NextFunction, Request, Response } from 'express';
import config from '../config';
import { verify as jwtVerify } from 'jsonwebtoken';
import { User } from '../database/user';

export const userAuth = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const path: string = req.baseUrl;
    if (!path.includes('api')) {
        next();
        return;
    }

    const authHeader = req.header('Authorization');
    if (!authHeader) {
        if (res.locals.isAdmin) return next();

        return res
            .status(401)
            .send('This request is missing Authorization header.');
    }

    const bearerToken = authHeader.replace('Bearer ', '');
    if (!bearerToken) {
        if (res.locals.isAdmin) return next();

        return res.status(401).send('unauthorized');
    }

    const jwtSecret = config.jwtSecret;
    let jwt: any;
    try {
        jwt = jwtVerify(bearerToken, jwtSecret);
        if (!jwt) {
            if (res.locals.isAdmin) return next();

            return res.status(401).send('This request is not authorized.');
        }
    } catch (err) {
        if (res.locals.isAdmin) return next();

        return res.status(401).send('This request is not authorized.');
    }

    const id = jwt.id;
    const email = jwt.email;
    const firstName = jwt.firstName;
    const lastName = jwt.lastName;
    const role = jwt.role;

    try {
        const user = await User.findOne({ where: { id } });
        res.locals.user = user;

        if (!user) {
            const newUser = await new User({
                id,
                firstName,
                lastName,
                email,
                role,
            }).save();
            res.locals.user = newUser;
        }
    } catch (err) {
        if (res.locals.isAdmin) return next();

        return res
            .status(500)
            .send('Failed to authorize user, please contact support.');
    }

    return next();
};

export const IsAdmin = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (res.locals.user?.role === 'admin') {
        return next();
    }
    return res.status(401).send('Unauthorized');
};
