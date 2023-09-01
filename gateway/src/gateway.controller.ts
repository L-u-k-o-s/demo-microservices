import { Controller, Get, Inject } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';


@Controller('users')
export class GatewayController {
    constructor(
      @Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy,
    ) {
    }

    @Get()
    public async getUserRes() {
        const userResponse = await firstValueFrom(
          this.userServiceClient.send('get-user', { id: 123 }),
        );

        return {
            message: 'userResponse',
            data: {
                user: userResponse,
            },
            errors: null,
        };
    }
}
