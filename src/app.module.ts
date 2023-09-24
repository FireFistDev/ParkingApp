import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './JWT/jwt.strategy';
import { AdministratorModule } from './administrator/administrator.module';
@Module({
  imports: [UserModule, PrismaModule ,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Use your JWT secret here
      signOptions: { expiresIn: '1h' }, // Token expiration time
    }),
    AdministratorModule,
  ],
  providers:[JwtStrategy]
})
export class AppModule {}
