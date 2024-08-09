import { Test, TestingModule } from '@nestjs/testing';
import { UserProfileController } from './user-profiles.controller';
import { UserProfileService } from './user-profiles.service';

describe('UserProfilesController', () => {
  let controller: UserProfileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserProfileController],
      providers: [UserProfileService],
    }).compile();

    controller = module.get<UserProfileController>(UserProfileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
