import { Test, TestingModule } from '@nestjs/testing';
import { UserRoleController } from './user-role.controller';
import { UserRoleService } from './user-role.service';

describe('UserRoleController', () => {
  let controller: UserRoleController;
  
  // Mock the UserRoleService
  let mockUserRoleService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserRoleController],
      providers: [
        {
          provide: UserRoleService,
          useValue: mockUserRoleService, // Provide the mock instead
        },
      ],
    }).compile();

    controller = module.get<UserRoleController>(UserRoleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
