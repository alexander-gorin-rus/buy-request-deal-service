import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { DealService } from './deal.service';
import {
  ICreateDealRequest,
  CreateDealResponse,
  IGetDialsRequest,
  GetDialsResponse,
  IUpdateDealRequest,
  UpdateDealResponse,
} from './interfaces/deal.interface';

@Controller()
export class DealController {
  constructor(private dealService: DealService) {}

  @GrpcMethod('DealService')
  async createDeal(request: ICreateDealRequest): Promise<CreateDealResponse> {
    return await this.dealService.createDeal(request);
  }

  @GrpcMethod('DealService')
  async updateDeal(request: IUpdateDealRequest): Promise<UpdateDealResponse> {
    return await this.dealService.updateDeal(request);
  }

  @GrpcMethod('DealService')
  async getDeals(data: IGetDialsRequest): Promise<GetDialsResponse> {
    return await this.dealService.getDeals(data);
  }
}
