import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserProfile } from './entities/user-profile.entity';
import { UserEntity } from '../users/entities/user.entity';
import { CloudinaryService } from 'src/cloundana/cloudinary.service';

@Injectable()
export class UserProfileService {
  constructor(
    @InjectRepository(UserProfile)
    private readonly userProfileRepository: Repository<UserProfile>,
    private readonly cloudinaryService: CloudinaryService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async uploadImages(
    id: number,
    profileImageFile: Express.Multer.File | undefined,
    coverImageFile?: Express.Multer.File | undefined,
    bio?: string,
    nickname?: string,
    gender?: string,
    birthdate?: Date,
    name?: string
  ) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
  
    let userProfile = await this.userProfileRepository.findOne({ where: { user: { id } } });
  
    if (!userProfile) {
      userProfile = new UserProfile();
    }
  
    userProfile.user = user;
    userProfile.bio = bio;
    userProfile.nickname = nickname;
    userProfile.gender = gender;
    userProfile.birthdate = birthdate;
    userProfile.name = name;
  
    if (profileImageFile) {
      try {
        const profileImagePath = profileImageFile.path;
        const profileImageResult = await this.cloudinaryService.uploadImage(profileImagePath);
        if (profileImageResult && profileImageResult.secure_url) {
          userProfile.profileImage = profileImageResult.secure_url;
        } else {
          throw new Error('Profile image upload failed');
        }
      } catch (error) {
        console.error('Error uploading profile image:', error);
      }
    }
  
    if (coverImageFile) {
      try {
        const coverImagePath = coverImageFile.path;
        const coverImageResult = await this.cloudinaryService.uploadImage(coverImagePath);
        if (coverImageResult && coverImageResult.secure_url) {
          userProfile.coverImage = coverImageResult.secure_url;
        } else {
          throw new Error('Cover image upload failed');
        }
      } catch (error) {
        console.error('Error uploading cover image:', error);
      }
    }
  
    await this.userProfileRepository.save(userProfile);
    return userProfile;
  }
  
  async getUserProfile(id: number): Promise<UserProfile> {
    const userProfile = await this.userProfileRepository.findOne({
      where: { user: { id } },
      relations: ['user'], 
    });
  
    if (!userProfile) {
      throw new NotFoundException('User profile not found');
    }
  
    return userProfile;
  }
}  