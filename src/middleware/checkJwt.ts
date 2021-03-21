import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  const token = <string>req.headers.authorization?.split(' ')[1];
  let jwtPayload;

  try {
    jwtPayload = <any>jwt.verify(token, `${process.env.JWT_SECRET_KEY}`);
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    res.status(401).send();
    return;
  }

  next();
};

export default checkJwt;
