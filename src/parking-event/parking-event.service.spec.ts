import { Test, TestingModule } from '@nestjs/testing';
import { ParkingEventService } from './parking-event.service';

describe('ParkingEventService', () => {
  let service: ParkingEventService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParkingEventService],
    }).compile();

    service = module.get<ParkingEventService>(ParkingEventService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
