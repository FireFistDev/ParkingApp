import { Body, Controller,Post, UseGuards ,Req} from '@nestjs/common';
import { ParkingEventService } from './parking-event.service';
import { JwtAuthGuard } from 'src/guards/Auth.Guard';
import { Request } from 'express'
import { User } from '@prisma/client';
interface CustomRequest extends Request {
  user;
}
@Controller('parking')
export class ParkingEventController {
  constructor(private readonly parkCarService: ParkingEventService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/start')
  startParking(@Req() req : CustomRequest) {
    const userId = req.user.userId
    console.log(userId)
    const data : {zoneId:number , carId : number , userId : number} = {...req.body, userId}
    return this.parkCarService.startParking(data);
  }
  
  // @UseGuards(JwtAuthGuard)
  @Post('/end')
  finishedParking(@Body() data : { zoneId: number, carId: number}){
    return this.parkCarService.endParking(data);
  }
}