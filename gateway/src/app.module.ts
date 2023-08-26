import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiConfigService } from './config/config.service';
import { ClientProxyFactory } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '../.env',
    })],
  controllers: [AppController],
  providers: [AppService,
    ApiConfigService,
    {
      provide: 'USER_SERVICE',
      useFactory: (configService: ApiConfigService) => {
        const userServiceOptions = configService.getUserServiceConfig();
        return ClientProxyFactory.create(userServiceOptions);
      },
      inject: [ApiConfigService],
    },
    {
      provide: 'MEETUP_SERVICE',
      useFactory: (configService: ApiConfigService) => {
        const meetupServiceConfig = configService.getMeetupServiceConfig();
        return ClientProxyFactory.create(meetupServiceConfig);
      },
      inject: [ApiConfigService],
    },
  ],
})
export class AppModule {
}
