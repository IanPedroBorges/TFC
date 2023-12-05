import { JwtPayload, Secret, SignOptions, sign, verify } from 'jsonwebtoken';

export default class JWT {
  static secret: Secret = process.env.JWT_SECRET || 'secret';

  static jwtConfig: SignOptions = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };

  static sign(payload: JwtPayload): string {
    return sign(payload, JWT.secret, JWT.jwtConfig);
  }

  static verify(token: string): JwtPayload | string {
    try {
      return verify(token, JWT.secret) as JwtPayload;
    } catch (error) {
      return 'Token not found';
    }
  }
}
