import { Controller, Get, Inject } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';


@Controller('users')
export class AppController {
  constructor(
    @Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy,
  ) {
  }

  @Get()
  public async getUserRes() {
    console.log('darova');

    const userResponse = await firstValueFrom(
      this.userServiceClient.send('get-user', 'djhfsjdhfjsdfhjsdhf'),
    );

    return {
      message: userResponse.message,
      data: {
        user: userResponse.user,
      },
      errors: null,
    };
  }
}
