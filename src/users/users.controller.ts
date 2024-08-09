import { Controller, Post, Body, Res, HttpStatus, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Response } from 'express';

@Controller('user')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Post('/register')
    async register(@Body() registerDto: RegisterUserDto) {
        return this.userService.register(registerDto);
    }

    @Post('/login')
    async login(@Body() loginDto: LoginUserDto) {
        return this.userService.login(loginDto);
    }

    @Get()
    async findAll() {
        return this.userService.findAll();
    }

    @Get('/profile/:id')
    async getUserProfile(@Param('id') id: number, @Res() res: Response) {
        try {
            const userProfile = await this.userService.getUserProfileById(id);
            return res.status(HttpStatus.OK).json(userProfile);
        } catch (error) {
            return res.status(error.status).json({ message: error.message });
        }
    }
}
