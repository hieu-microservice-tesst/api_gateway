import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import axios from 'axios';

@Controller()
export class ApiGatewayController {
  private readonly cartServiceUrl = 'http://localhost:3003';
  private readonly orderServiceUrl = 'http://localhost:3000';
  private readonly productServiceUrl = 'http://localhost:3002';
  private readonly userServiceUrl = 'http://localhost:3001';

  @Get('cart/:userId')
  async getCart(@Param('userId') userId: number) {
    const cartResponse = await axios.get(`${this.cartServiceUrl}/cart/${userId}`);
    return cartResponse.data;
  }

  @Post('cart')
  async addToCart(@Body() data: any) {
    const cartResponse = await axios.post(`${this.cartServiceUrl}/cart`, data);
    return cartResponse.data;
  }

  @Get('order/:userId')
  async getAllOrders(@Param('userId') userId: number) {
    const orderResponse = await axios.get(`${this.orderServiceUrl}/order/${userId}`);
    return orderResponse.data;
  }

  @Post('order')
  async createOrder(@Body() data: any) {
    const orderResponse = await axios.post(`${this.orderServiceUrl}/order`, data);
    return orderResponse.data;
  }

  @Post('order/delete')
  async deleteOrder(@Body() data: any) {
    const orderResponse = await axios.post(`${this.orderServiceUrl}/order/delete`, data);
    return orderResponse.data;
  }

  @Get('product/:id')
  async getProduct(@Param('id') id: number) {
    const productResponse = await axios.get(`${this.productServiceUrl}/product/${id}`);
    return productResponse.data;
  }

  @Get('user/:id')
  async getUser(@Param('id') id: number) {
    const userResponse = await axios.get(`${this.userServiceUrl}/user/${id}`);
    return userResponse.data;
  }

  @Post('user')
  async createUser(@Body() data: any) {
    const userResponse = await axios.post(`${this.userServiceUrl}/user`, data);
    return userResponse.data;
  }
}