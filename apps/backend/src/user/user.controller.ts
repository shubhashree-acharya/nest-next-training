import { Controller, Get, Post, Param, Body, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    findAll() {
        return this.userService.findAll();
    }
    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.userService.findOne(Number(id));
    }
    @UseGuards(AuthGuard('jwt'))
    @Post()
    create(@Body() userData: Partial<User>) {
        return this.userService.signup(userData);
    }
}
