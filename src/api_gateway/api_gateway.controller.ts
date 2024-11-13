import { Controller, Get, Post, Body, Param, Logger } from '@nestjs/common';
import { ApiGatewayService } from './api_gateway.service';

@Controller()
export class ApiGatewayController {
  private readonly logger = new Logger(ApiGatewayController.name);

  constructor(private readonly apiGatewayService: ApiGatewayService) {}

  @Get('cart/:userId')
  async getCart(@Param('userId') userId: number) {
    return this.apiGatewayService.getCart(userId);
  }

  @Post('cart')
  async addToCart(@Body() data: any) {
    return this.apiGatewayService.addToCart(data);
  }

  @Get('order/:userId')
  async getAllOrders(@Param('userId') userId: number) {
    return this.apiGatewayService.getAllOrders(userId);
  }

  @Post('order')
  async createOrder(@Body() data: any) {
    return this.apiGatewayService.createOrder(data);
  }

  @Post('order/delete')
  async deleteOrder(@Body() data: any) {
    return this.apiGatewayService.deleteOrder(data);
  }

  @Get('product/:id')
  async getProduct(@Param('id') id: number) {
    return this.apiGatewayService.getProduct(id);
  }

  @Get('user/:id')
  async getUser(@Param('id') id: number) {
    return this.apiGatewayService.getUser(id);
  }

  @Post('user')
  async createUser(@Body() data: any) {
    return this.apiGatewayService.createUser(data);
  }
}
