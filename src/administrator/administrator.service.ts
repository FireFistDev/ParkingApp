import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtStrategy } from "src/JWT/jwt.strategy";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class AdministratorService {
  constructor(private readonly prismaService: PrismaService,
      private readonly jwtStrategy: JwtStrategy
    ) {}

  async loginAdmin(admin : {adminName : string,password:string}) : Promise<string> {
    try {
      const isAdmin = await this.prismaService.adminisrator.findUnique({where:{adminName:admin.adminName}})
      if(!isAdmin)  throw  new UnauthorizedException()
      if(admin.password != isAdmin.password) throw new UnauthorizedException('wrong password')
      return this.jwtStrategy.generateAdminToken(isAdmin)
    } catch (error) {
      throw new BadRequestException(error)
    }
  }
}
