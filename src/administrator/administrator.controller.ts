import { Controller, Post, Body, Get , Param, Patch, Delete} from "@nestjs/common";
import { AdministratorService } from "./administrator.service";
import { ParkingZone } from "@prisma/client";

@Controller("administrator")
export class AdministratorController {
  constructor(private readonly administratorService: AdministratorService) {}

  @Post("create")
  creteParkingZone(@Body() parkingZone: ParkingZone) {
    return this.administratorService.createZone(parkingZone);
  }
  @Patch('updateZone')
  updateZone(@Body() parkingZone: ParkingZone) {
    return this.administratorService.updateZone(parkingZone);
  }
  @Delete('deletezone/:id')
  deleteZone(@Param(':id') zoneId : number) {
    return this.administratorService.deleteZone(zoneId);
  }
  @Get("getzones")
  getParkingZones() {
    return this.administratorService.getAllZones();
  }
  @Get("getzone/:id")
  getSingleZone(@Param("id") id: number) {
    return this.administratorService.getSingleZone(id);
  }

}

