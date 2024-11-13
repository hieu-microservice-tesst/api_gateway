import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import axios, { AxiosError } from 'axios';

@Injectable()
export class ApiGatewayService {
  private readonly logger = new Logger(ApiGatewayService.name);
  private readonly cartServiceUrl = 'https://micro-cart.vercel.app';
  private readonly orderServiceUrl = 'https://micro-order.vercel.app';
  private readonly productServiceUrl = 'https://micro-product-p7ec.vercel.app';
  private readonly userServiceUrl = 'https://micro-user.vercel.app';

  private async handleRequest(requestFn: () => Promise<any>) {
    try {
      const response = await requestFn();
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        this.logger.error(`Yêu cầu thất bại: ${axiosError.message}`);
        this.logger.error(`URL: ${axiosError.config?.url}`);
        this.logger.error(`Trạng thái: ${axiosError.response?.status}`);
        this.logger.error(`Dữ liệu phản hồi:`, axiosError.response?.data);

        // Kiểm tra nếu dịch vụ không khả dụng
        if (!axiosError.response) {
          throw new HttpException(
            'Dịch vụ không khả dụng',
            HttpStatus.SERVICE_UNAVAILABLE
          );
        }

        // Trả về mã trạng thái và thông báo lỗi phù hợp
        throw new HttpException(
          axiosError.response.data || 'Lỗi máy chủ nội bộ',
          axiosError.response.status || HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
      
      // Xử lý lỗi không phải từ Axios
      this.logger.error('Lỗi không mong muốn:', error);
      throw new HttpException(
        'Lỗi máy chủ nội bộ',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getCart(userId: number) {
    return this.handleRequest(() => 
      axios.get(`${this.cartServiceUrl}/cart/${userId}`)
    );
  }

  async addToCart(data: any) {
    return this.handleRequest(() =>
      axios.post(`${this.cartServiceUrl}/cart`, data)
    );
  }

  async getAllOrders(userId: number) {
    return this.handleRequest(() =>
      axios.get(`${this.orderServiceUrl}/order/${userId}`)
    );
  }

  async createOrder(data: any) {
    return this.handleRequest(() =>
      axios.post(`${this.orderServiceUrl}/order`, data)
    );
  }

  async deleteOrder(data: any) {
    return this.handleRequest(() =>
      axios.post(`${this.orderServiceUrl}/order/delete`, data)
    );
  }

  async getProduct(id: number) {
    return this.handleRequest(() =>
      axios.get(`${this.productServiceUrl}/product/${id}`)
    );
  }

  async getUser(id: number) {
    return this.handleRequest(() =>
      axios.get(`${this.userServiceUrl}/user/${id}`)
    );
  }

  async createUser(data: any) {
    return this.handleRequest(() =>
      axios.post(`${this.userServiceUrl}/user`, data)
    );
  }
}
