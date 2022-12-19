import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  ICreateOfferRequest,
  ICreateOfferResponse,
  IDeleteOfferRequest,
  IDeleteOfferResponse,
  IGetOffersConsumerRequest,
  IGetOffersRequest,
  IGetOffersResponse,
  IUpdateOfferRequest,
  IUpdateOfferResponse,
} from './interfaces/offer.interface';
import { OfferService } from './offer.service';

@Controller()
export class OfferController {
  constructor(private offerService: OfferService) {}

  @GrpcMethod('DealService')
  async createOffer(
    request: ICreateOfferRequest,
  ): Promise<ICreateOfferResponse> {
    return await this.offerService.createOffer(request);
  }

  @GrpcMethod('DealService')
  async getOffers(request: IGetOffersRequest): Promise<IGetOffersResponse> {
    return await this.offerService.getOffers(request);
  }

  @GrpcMethod('DealService')
  async updateOffer(
    request: IUpdateOfferRequest,
  ): Promise<IUpdateOfferResponse> {
    return await this.offerService.updateOffer(request);
  }

  @GrpcMethod('DealService')
  async deleteOffer(
    request: IDeleteOfferRequest,
  ): Promise<IDeleteOfferResponse> {
    return await this.offerService.deleteOffer(request);
  }

  @GrpcMethod('DealService')
  async getOffersConsumer(
    request: IGetOffersConsumerRequest,
  ): Promise<IGetOffersResponse> {
    return await this.offerService.getOffersConsumer(request);
  }
}
