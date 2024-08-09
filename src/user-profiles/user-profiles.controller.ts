import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
  Param,
  Res,
  Get,
  Body,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UserProfileService } from './user-profiles.service';
import { Response } from 'express';
import { UserProfile } from './entities/user-profile.entity';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';

@Controller('user-profile')
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}

  @Post('upload/:userId')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'profileImage', maxCount: 1 },
        { name: 'coverImage', maxCount: 1 },
      ],
      { dest: 'uploads/',
        limits: { fileSize: 10 * 1024 * 1024 } 
       },
    ),
  )
  async uploadProfileAndCoverImages(
    @Param('userId') userId: number,
    @UploadedFiles() files: { profileImage?: Express.Multer.File[]; coverImage?: Express.Multer.File[] },
    @Body() createUserProfileDto: CreateUserProfileDto,
    @Res() res: Response,
  ) {
   
    try {
      const upload = await this.userProfileService.uploadImages(
        userId,
        files.profileImage ? files.profileImage[0] : undefined,
        files.coverImage ? files.coverImage[0] : undefined,
        createUserProfileDto.bio,
        createUserProfileDto.nickname,
        createUserProfileDto.gender,
        createUserProfileDto.birthdate ? new Date(createUserProfileDto.birthdate) : undefined,
        createUserProfileDto.name,
      );
      return res.json(upload);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  

  @Get(':id')
  async getUserProfile(@Param('id') id: number): Promise<UserProfile> {
    return this.userProfileService.getUserProfile(id);
  }
}
