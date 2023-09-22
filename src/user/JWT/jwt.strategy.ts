// jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './jwt-payload.interface'; // Create this interface
import { User } from '@prisma/client';
import * as jwt from 'jsonwebtoken'; // Import jsonwebtoken
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET, // Use your JWT secret here
    });

  }

  async validate(payload: JwtPayload) {
    // You can add additional validation logic here if needed
    if (!payload) {
      throw new UnauthorizedException();
    }
    return payload;
  }

  async generateToken(user : User): Promise<string> {
    const payload = {
      userId: user.id,
      email: user.email,
      userName: user.userName,
    };
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1h', // Adjust token expiration as needed
    });
  }
  
}
