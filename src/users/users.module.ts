import { UserEntity } from './entities/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserProfile } from 'src/user-profiles/entities/user-profile.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, UserProfile]),
    JwtModule.register({
      secret: 'your_secret_key', // Replace with your secret key or use an environment variable
      signOptions: { expiresIn: '1h' }, // Token expiry time
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
