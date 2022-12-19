import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { GrpcRequestService } from './grpc.request.service';
import { ClientGrpc } from '@nestjs/microservices';
import configuration from '../../config/configuration';
import { ConfigService } from '@nestjs/config';
import {
  IGetProductsRequest,
  IProduct,
  IProductServiceClient,
} from './interfaces/product.interface';
import { IPaginatedArray } from '../types';

const {
  packageNames: { PRODUCT_PACKAGE },
} = configuration();

@Injectable()
export class ProductGrpcService
  extends GrpcRequestService
  implements OnModuleInit, IProductServiceClient
{
  private productService: IProductServiceClient;

  constructor(
    @Inject(PRODUCT_PACKAGE.name) private userClient: ClientGrpc,
    private readonly configService: ConfigService,
  ) {
    super(userClient);
  }

  onModuleInit() {
    this.productService = this.userClient.getService<IProductServiceClient>(
      this.configService.get('packageNames').PRODUCT_PACKAGE.packageName,
    );
  }

  async getProducts(
    request: IGetProductsRequest,
  ): Promise<IPaginatedArray<IProduct>> {
    const result = await this.getResponse<
      IPaginatedArray<IProduct>,
      IProductServiceClient,
      IGetProductsRequest
    >(this.productService, 'getProducts', request);
    return { ...result, data: result.data || [] };
  }
}
