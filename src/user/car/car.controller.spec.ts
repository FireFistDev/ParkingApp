import { Test, TestingModule } from "@nestjs/testing";
import { CarController } from "./car.controller";
import { CarService } from "./car.service";
import { CreateCarDto, UpdateCarDto } from "./carDtos/car.dto";
import { PrismaService } from "../../prisma/prisma.service";
import { Car } from "@prisma/client";
import { CustomRequestCar } from "./car.controller";
describe("CarController", () => {
  let carController: CarController;
  let carService: CarService;
  const userId = 1;
  const createCarDto: CreateCarDto = {
    carName: "Test Car",
    type: "SEDAN",
    serialNumber: "123456789",
  };
  const CAR : Car = {
    id: userId,
    ownerId: userId,
    carName: createCarDto.carName,
    type: createCarDto.type,
    serialNumber: createCarDto.serialNumber,
  };

  const mockCarRequest = {
    user: { userId },
    body: createCarDto,
  } as unknown as CustomRequestCar; // Cast the mock request to CustomRequest

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarController],
      providers: [CarService, PrismaService], // Include PrismaService here
    }).compile();

    carController = module.get<CarController>(CarController);
    carService = module.get<CarService>(CarService);
  });

  describe("createCar", () => {
    it("should create a car and return it", async () => {
      const userId = 1;
      // Mock the carService.createCar method
      const createCarMock = jest.spyOn(carService, "createCar");

      createCarMock.mockResolvedValue(CAR);
      const result = await carController.createCar(mockCarRequest);
      // Expectations
      expect(createCarMock).toHaveBeenCalledWith(createCarDto, userId);
      expect(result).toBe(CAR);
    });
  });
  describe("deleteCar", () => {
    it("should delete a car", async () => {
      // Mocked carId to delete
      const carIdToDelete = 1;
      // Mock the carService.deleteCar method
      const deleteCarMock = jest.spyOn(carService, "deleteCar");
      // Assuming your deleteCar method returns the deleted car or throws an exception if not found
      deleteCarMock.mockResolvedValue({
        id: carIdToDelete,
        ownerId: 1,
        carName: "Test Car",
        type: "SEDAN",
        serialNumber: "123456789",
      });
      // Call the deleteCar method
      const result = await carController.deleteCar(carIdToDelete);

      // Expectations
      expect(deleteCarMock).toHaveBeenCalledWith(carIdToDelete);
      expect(result).toEqual(CAR)
      // Add more expectations as needed
    });
  });
  describe('getUserCars', () => {
    it('should return user cars', async () => {
      // Mocked userId
      // Mock the custom request with user information
      const mockRequest = {
        user: { userId },
      } as unknown as CustomRequestCar; // Cast the mock request to CustomRequest
    // Cast the mock request to CustomRequestCar

      // Mock the carService.getCars method
      const getCarsMock = jest.spyOn(carService, 'getCars');
      // Mocked car data
      const cars: Car[] = [
        {
          id: 1,
          ownerId: userId,
          carName: 'Car 1',
          type: 'SEDAN',
          serialNumber: '123456',
        },
        {
          id: 2,
          ownerId: userId,
          carName: 'Car 2',
          type: 'JEEP',
          serialNumber: '789012',
        },
      ];
      getCarsMock.mockResolvedValue(cars);

      // Call the getUserCars method with the mock request
      const result = await carController.getUserCars(mockRequest);

      // Expectations
      expect(getCarsMock).toHaveBeenCalledWith(userId);
      expect(result).toEqual(cars);
    });
  })

  describe('updateCar', () => {
    it('should update a car and return it', async () => {
      // Mocked car data for the request body
      const updatedCarData: UpdateCarDto = {
        id: 1,
        carName: 'Updated Car',
      };

      // Mock the carService.updateCar method
      const updateCarMock = jest.spyOn(carService, 'updateCar');
      // Assuming your updateCar method returns the updated car or throws an exception if not found
      const updatedCar: Car = {
        id: 1,
        ownerId: 1,
        carName: updatedCarData.carName,
        type: 'SEDAN',
        serialNumber: '123456789',
      };
      updateCarMock.mockResolvedValue(updatedCar);

      // Call the updateCar method
      const result = await carController.updateCar(updatedCarData);

      // Expectations
      expect(updateCarMock).toHaveBeenCalledWith(updatedCarData);
      expect(result).toBe(updatedCar);
    });
})
});
