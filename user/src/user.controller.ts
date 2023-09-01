import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserDto } from './user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @MessagePattern('get-user')
    getHello(@Payload() { id }: { id: number }): UserDto {
        console.log(id);
        return this.userService.getUserById(id);
    }
}
