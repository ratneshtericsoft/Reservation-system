import { Body, Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly userService : UsersService){}

    async create(@Body() createUserDto: CreateUserDto){
        return await this.userService.create(createUserDto)
    }
}