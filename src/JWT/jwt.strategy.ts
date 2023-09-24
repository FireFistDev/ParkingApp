// jwt.strategy.ts
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "./jwt-payload.interface"; // Create this interface
import { User, adminisrator } from "@prisma/client";
import * as jwt from "jsonwebtoken"; // Import jsonwebtoken
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
      throw new UnauthorizedException('token is not authorized');
    }
    return payload;
  }
  async verifyToken(token: string) {
    try {
      const payload =   jwt.verify(
        token,
        process.env.JWT_SECRET,
        (err, decoded) => {
          if (err) {
            // Token verification failed
            throw new UnauthorizedException("Invalid token");
          } else {
            // Token is valid and decoded contains the payload
            return decoded
          }
        }
      ); // Verify and decode the token
      return payload;
    } catch (error) {
      throw new UnauthorizedException("Invalid token");
    }
  }
  async generateToken(user: User): Promise<string> {
    const payload = {
      userId: user.id,
      email: user.email,
      userName: user.userName,
      balance: user.balance,
    };
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h", // Adjust token expiration as needed
    });
  }
  async generateAdminToken(admin:adminisrator): Promise<string> {
    const payload = {
      id : admin.id,
      adminName : admin.adminName
    };
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h", // Adjust token expiration as needed
    });
  }
}
