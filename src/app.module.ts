import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './JWT/jwt.strategy';
import { AdministratorModule } from './administrator/administrator.module';
import { ParkingEventModule } from './parking-event/parking-event.module';
@Module({
  imports: [UserModule, PrismaModule ,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_TIME },
    }),
    AdministratorModule,
    ParkingEventModule,
  ],
  providers:[JwtStrategy]
})
export class AppModule {}
