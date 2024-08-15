import passport from 'passport';
import { Strategy as PassportStrategy } from 'passport-strategy';
import User from './models/user.interface';
import jwt from 'jsonwebtoken';
import passportJwt, { ExtractJwt, VerifiedCallback, VerifyCallback } from 'passport-jwt';
import { config } from './config';
import ResponseError from './ResponseError';
import { Request, Response, NextFunction } from 'express';

export const authStrategy = function (req: Request, res: Response, next: NextFunction): void {
    console.log("Strat");
    const validate: FullJWT = jwtFromCookie(req);
    if (validate.err) {
        res.sendStatus(401);
        // next(validate.err);
    } else {
        next();
    }
}

interface GetToken {
    (user: User): string;
}

export const getTokenLogin: GetToken = function(user: User): string {
    console.log("User: " + JSON.stringify(user));
    const payload: FullJWT['token']['payload'] = {
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        permissions: {
            passwordreset: true
        }
    }
    return jwt.sign(payload, config.secretKey, {
        expiresIn: 3600
    });
};

export const getTokenAccountVerification: GetToken = function(user: User): string {
    console.log("User: " + JSON.stringify(user));
    const payload: FullJWT['token']['payload'] = {
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        permissions: {
            verifyaccount: true
        }
    }
    return jwt.sign(payload, config.secretKey, {
        expiresIn: 3600
    });
};

export const getTokenAccountRecovery: GetToken = function(user: User): string {
    console.log("User: " + JSON.stringify(user));
    const payload: FullJWT['token']['payload'] = {
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        permissions: {
            accountrecovery: true
        }
    }
    return jwt.sign(payload, config.secretKey, {
        expiresIn: 3600
    });
};

export interface Permissions {
    passwordreset?: boolean;
    accountrecovery?: boolean;
    verifyaccount?: boolean;
}

export interface FullJWT {
    token: {
        header: {
            alg: string,
            typ: string
        };
        payload: {
            email: string,
            firstname: string,
            lastname: string,
            permissions: Permissions
        };
        signature: string;
    };
    err: ResponseError | null;
}

const EmptyToken: FullJWT["token"] = {
        header: {
            alg: "",
            typ: ""
        },
        payload: {
            email: "",
            firstname: "",
            lastname: "",
            permissions: {}
        },
        signature: ""
}

function isFullJWT(obj: any): boolean {
    try {
        const objFullJWT: FullJWT = obj;
        return true;
    } catch {
        return false;
    }
}

export const jwtFromHeader = function (req: Request): FullJWT {
    if (req.headers.authorization) {
        console.log("Before verify");
        return jwtFromString(req.headers.authorization.split(' ')[1]);
    } else {
        const err: ResponseError = new Error("Bad JWT Token");
        err.status = 400;
        return {token: EmptyToken, err: err};
    }
}

export const jwtFromCookie = function (req: Request): FullJWT {
    if (req.cookies.token) {
        console.log("Before verify");
        return jwtFromString(req.cookies.token);
    } else {
        const err: ResponseError = new Error("Bad JWT Token");
        err.status = 400;
        return {token: EmptyToken, err: err};
    }
}

export const jwtFromString = function(token: string): FullJWT {
    try {
        console.log("token: " + token);
        const decryptedToken: string | object = jwt.verify(token, config.secretKey, {complete: true});
        console.log("Made it past verify");
        if (typeof decryptedToken === "object") {
            console.log("Obj");
            console.log("decryptedToken: " + JSON.stringify(decryptedToken));
            const fullJWTcandidate: any = {token: decryptedToken, err: null}
            if (isFullJWT(fullJWTcandidate)) {
                console.log("Is FullJWT");
                return fullJWTcandidate;
            } else {
                console.log("Isn't FullJWT");
                const err: ResponseError = new Error("Bad JWT Token");
                err.status = 400;
                return {token: EmptyToken, err: err};
            }
        } else {
            console.log("String");
            console.log("decryptedToken: " + decryptedToken);
            const err: ResponseError = new Error("Bad JWT Token");
            err.status = 400;
            return {token: EmptyToken, err: err};
        }
    } catch {
        console.log("No bueno")
        const err: ResponseError = new Error("Invalid JWT");
        err.status = 403;
        return {token: EmptyToken, err: err};
    }
}