import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from './entities/user.entity';
import { UserProfile } from '../user-profiles/entities/user-profile.entity'; // Import UserProfile entity

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>,
        @InjectRepository(UserProfile)
        private userProfileRepository: Repository<UserProfile>, // Inject UserProfile repository
        private jwtService: JwtService
    ) {}

    async register(registerDto: RegisterUserDto) {
        try {
            const user = await this.usersRepository.save({
                name: registerDto.name,
                email: registerDto.email,
                password: await bcrypt.hash(registerDto.password, 10),
            });

            if (!user) {
                throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
            }

            const payload = { id: user.id };
            const access_token = await this.jwtService.signAsync(payload);

            return {
                message: 'User registered successfully',
                result: { user, access_token },
            };
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async login(loginDto: LoginUserDto) {
        try {
            const user = await this.usersRepository.findOne({
                where: { email: loginDto.email },
            });

            if (!user) {
                throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
            }

            const compare = await bcrypt.compare(loginDto.password, user.password);

            if (!compare) {
                throw new HttpException('Password is incorrect', HttpStatus.BAD_REQUEST);
            }

            const payload = { id: user.id };
            const access_token = await this.jwtService.signAsync(payload);

            return {
                message: 'Login successfully',
                result: { user, access_token },
            };
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findAll() {
        try {
            const users = await this.usersRepository.find();
            return {
                message: 'All users fetched successfully',
                users,
            };
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getUserProfileById(userId: number) {
        try {
            const user = await this.usersRepository.findOne({
                where: { id: userId },
                relations: ['profile'], // Use the correct relation name
            });

            if (!user) {
                throw new HttpException('User not found', HttpStatus.NOT_FOUND);
            }

            return {
                message: 'User profile fetched successfully',
                 user
            };
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}