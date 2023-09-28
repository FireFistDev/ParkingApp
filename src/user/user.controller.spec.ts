import { Test, TestingModule } from "@nestjs/testing";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { PrismaService } from "../prisma/prisma.service"; // Import PrismaService
import { JwtStrategy } from "../JWT/jwt.strategy"; // Import JwtStrategy

describe("UserController", () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, PrismaService, JwtStrategy], // Include PrismaService and JwtStrategy
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });
  const createUserDto = {
    password: "password123",
    email: "test@example.com", // Swapped fields
    userName: "testuser", // Swapped fields
  };
  const loginUserDto = {
    password: "password123",
    email: "test@example.com", // Swapped fields    // Swapped fields
  };
  const passwordRecovery = {
    email: "test@example.com", // Swapped fields    // Swapped fields
  };

  const mockJwtToken = "mocked-jwt-token";
  describe("registerUser", () => {
    it("should register a user and return a JWT token with swapped DTO fields", async () => {
      // Mock the userService.createUser method

      jest.spyOn(userService, "createUser").mockResolvedValue(mockJwtToken);

      // Call the registerUser route handler
      const result = await userController.registerUser(createUserDto);

      // Expectations
      expect(userService.createUser).toHaveBeenCalledWith(createUserDto);
      expect(result).toBe(mockJwtToken);
    });
  });
  describe("loginUser", () => {
    it("should login a user and return a JWT", async () => {
      jest.spyOn(userService, "findUser").mockResolvedValue(mockJwtToken);

      // Call the registerUser route handler
      const result = await userController.loginUser(loginUserDto);

      // Expectations
      expect(userService.findUser).toHaveBeenCalledWith({
        email: "test@example.com", // Swapped fields   ww
        password: "password123",
      });
      expect(result).toBe(mockJwtToken);
    });
  });
  describe("requestpasswordRecovery", () => {
    it("should login requestpasswordRecovery and return a JWT", async () => {
      jest
        .spyOn(userService, "requestPasswordRecovery")
        .mockResolvedValue(mockJwtToken);

      // Call the registerUser route handler
      const result =
        await userController.requestPasswordRecovery(passwordRecovery);

      // Expectations
      expect(userService.requestPasswordRecovery).toHaveBeenCalledWith(
        "test@example.com"
      );
      expect(result).toBe(mockJwtToken);
    });
  });

  describe("requestpasswordRecovery", () => {
    it("should login requestpasswordRecovery and return a JWT", async () => {
      jest
        .spyOn(userService, "requestPasswordRecovery")
        .mockResolvedValue(mockJwtToken);

      // Call the registerUser route handler
      const result =
        await userController.requestPasswordRecovery(passwordRecovery);

      // Expectations
      expect(userService.requestPasswordRecovery).toHaveBeenCalledWith(
        "test@example.com"
      );
      expect(result).toBe(mockJwtToken);
    });
  });
  describe("requestNewPassword", () => {
    it("should request a new password", async () => {
      // Mock the userService.setNewPassword method
      const setNewPasswordMock = jest.spyOn(userService, "setNewPassword");
      setNewPasswordMock.mockResolvedValue(mockJwtToken);
    });
  });
});


