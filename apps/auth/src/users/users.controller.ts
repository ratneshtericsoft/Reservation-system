import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CurrentUser } from '../current-user.decorator';
import { UserDocument } from './models/user.schema';

@Controller('users')
export class UsersController {
    constructor(private readonly userService : UsersService){}
    
    @Post()
    async create(@Body() createUserDto: CreateUserDto){
        return await this.userService.create(createUserDto)
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async getUser(@CurrentUser() user: UserDocument) {
        return user;
    }
}
