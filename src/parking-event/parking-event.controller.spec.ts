import { Test, TestingModule } from '@nestjs/testing';
import { ParkingEventController } from './parking-event.controller';
import { ParkingEventService } from './parking-event.service';

describe('ParkingEventController', () => {
  let controller: ParkingEventController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParkingEventController],
      providers: [ParkingEventService],
    }).compile();

    controller = module.get<ParkingEventController>(ParkingEventController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
