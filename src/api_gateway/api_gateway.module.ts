import { Module } from '@nestjs/common';
import { ApiGatewayController } from './api_gateway.controller';

@Module({
  controllers: [ApiGatewayController]
})
export class ApiGatewayModule {}
