import { Test, TestingModule } from '@nestjs/testing';
import { UserProfileService } from './user-profiles.service';

describe('UserProfilesService', () => {
  let service: UserProfileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserProfileService],
    }).compile();

    service = module.get<UserProfileService>(UserProfileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
