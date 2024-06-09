import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs'
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';


@Injectable()
export class UsersService {
    constructor(
        private readonly userRepository : UserRepository
    ){}

    async create(createUserDto : CreateUserDto){
        return this.userRepository.create({
            ...createUserDto,
            password : await bcrypt.hash(createUserDto.password, 10)
        })

    }
    async verifyUser(email: string, password: string){
        const user = await this.userRepository.findOne({email});
        // if(!user){
        //     throw new NotFoundException('User not Found')
        // }
       const passwordIsValid = await bcrypt.compare(password, user.password)
       if(!passwordIsValid){
        throw new UnauthorizedException('Invalid Credentials')
       }
       return user;
    }
}
