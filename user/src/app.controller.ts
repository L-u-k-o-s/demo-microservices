import {Controller} from '@nestjs/common';
import {AppService} from './app.service';
import {MessagePattern, Payload} from "@nestjs/microservices";

@Controller('user')
export class AppController {
    constructor(private readonly appService: AppService) {
    }

    @MessagePattern('get-user')
    getHello(@Payload() smth: any): string {
        console.log(smth);
        return this.appService.getHello();
    }
}
