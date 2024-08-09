import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProfileController } from './user-profiles.controller';
import { UserProfileService } from './user-profiles.service';
import { UserProfile } from './entities/user-profile.entity';
import { UserEntity } from '../users/entities/user.entity';
import { CloudinaryModule } from 'src/cloundana/ cloudinary.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserProfile, UserEntity]),
  CloudinaryModule,
],
  controllers: [UserProfileController],
  providers: [UserProfileService],
  exports: [UserProfileService],

})
export class UserProfileModule {}
