// jwt.strategy.ts
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "./jwt-payload.interface"; // Create this interface
import { User, Adminisrator } from "@prisma/client";
import * as jwt from "jsonwebtoken"; // Import jsonwebtoken
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET, // Use your JWT secret here
    });
  }

  async validate(payload : JwtPayload) {
    if (!payload) {
    }
      return payload
  }

  async generateToken(user: User): Promise<string> {
    const payload = {
      userId: user.id,
      email: user.email,
      userName: user.userName,
      balance: user.balance,
    };
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_TIME, // Adjust token expiration as needed
    });
  }
  async generateAdminToken(admin :Adminisrator): Promise<string> {
    const payload = {
      id : admin.id,
      adminName : admin.adminName
    };
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_TIME, // Adjust token expiration as needed
    });
  }
}
