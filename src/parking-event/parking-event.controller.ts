import { Body, Controller,Post, UseGuards ,Req} from '@nestjs/common';
import { ParkingEventService } from './parking-event.service';
import { JwtAuthGuard } from '../guards/Auth.Guard';
import { Request } from 'express'
import { JwtPayload } from 'jsonwebtoken';
interface CustomRequest extends Request {
  user : JwtPayload;
}
@Controller('parking')
export class ParkingEventController {
  constructor(private readonly parkCarService: ParkingEventService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/start')
  startParking(@Req() req : CustomRequest) {
    const userId : number = req.user.userId
    const parkingData = req.body
    return this.parkCarService.startParking(parkingData, userId);
  }
  
  @UseGuards(JwtAuthGuard)
  @Post('/end')
  finishedParking(@Body() data : { zoneId: number, carId: number}){
    return this.parkCarService.endParking(data);
  }
}