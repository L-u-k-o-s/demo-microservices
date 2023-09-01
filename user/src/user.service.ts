import { Injectable } from '@nestjs/common';
import { UserDto } from './user.dto';

@Injectable()
export class UserService {
    getUserById(id: number): UserDto {
        return {
            id,
            name: 'Max',
        };
    }
}
