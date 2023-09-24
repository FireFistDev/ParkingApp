import { Controller, Post, Body} from "@nestjs/common";
import { AdministratorService } from "./administrator.service";
@Controller("admin")
export class AdministratorController {
  constructor(private readonly administratorService: AdministratorService) {}

  @Post('/admin')
  loginAdmin(@Body() admin : {adminName : string,password:string} ) : Promise<string>{
    return this.administratorService.loginAdmin(admin);
  }
}

