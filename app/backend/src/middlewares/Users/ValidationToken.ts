import { NextFunction, Request, Response } from 'express';
import JWT from '../../utils/JWT';

export default class ValidationsToken {
  static validateToken(req: Request, res: Response, next: NextFunction): Response | void {
    const token = req.headers.authorization;
    const errorMensage = 'Token must be a valid token';
    if (!token) return res.status(401).json({ message: 'Token not found' });
    try {
      const tokenSplit = token.split(' ')[1];
      const tokenDecoded = JWT.verify(tokenSplit);
      if (!tokenDecoded) return res.status(401).json({ message: errorMensage });
      req.body.user = tokenDecoded;
      return next();
    } catch (error: any) {
      return res.status(401).json({ message: error.message });
    }
  }
}
