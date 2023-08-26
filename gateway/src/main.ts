import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ApiConfigService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ApiConfigService);
  const port = configService.getGatewayPort();
  console.log(port);

  await app.listen(port);
}

bootstrap();
