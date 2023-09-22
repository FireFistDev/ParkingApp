import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './user/JWT/jwt.strategy';
@Module({
  imports: [UserModule, PrismaModule ,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Use your JWT secret here
      signOptions: { expiresIn: '1h' }, // Token expiration time
    }),
  ],
  providers:[JwtStrategy]
})
export class AppModule {}
