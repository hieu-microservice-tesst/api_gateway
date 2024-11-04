import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api_gateway/api_gateway.module';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);
  await app.listen(5000);
}
bootstrap();
