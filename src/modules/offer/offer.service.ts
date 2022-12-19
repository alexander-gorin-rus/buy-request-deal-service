import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { AmqpService } from '../../amqp/amqp.service';
import { CommonService } from '../../common/common.service';
import {
  EOfferStatus,
  ICreateOfferRequest,
  ICreateOfferResponse,
  IDeleteOfferRequest,
  IDeleteOfferResponse,
  IGetOffersConsumerRequest,
  IGetOffersRequest,
  IGetOffersResponse,
  INewOffer,
  IOffer,
  IUpdateOffer,
  IUpdateOfferRequest,
  IUpdateOfferResponse,
  OfferNotificationType,
} from './interfaces/offer.interface';
import Offer from './offer.entity';
import { RequestGrpcService } from '../../common/services/request.grpc-service';
import { ProductGrpcService } from '../../common/services/product.grpc-service';

@Injectable()
export class OfferService extends CommonService {
  constructor(
    @InjectRepository(Offer) private offerRepository: Repository<Offer>,
    private config: ConfigService,
    private readonly amqpService: AmqpService,
    private readonly requestService: RequestGrpcService,
    private readonly productService: ProductGrpcService,
  ) {
    super(offerRepository);
  }

  async createOffer(
    request: ICreateOfferRequest,
  ): Promise<ICreateOfferResponse> {
    const { offer } = request;
    try {
      const { data } = await this.requestService.getRequestsById({
        requestId: offer.requestId,
      });

      const products = await this.productService.getProducts({
        productId: offer.productId,
      });

      if (!products || !products.data.length) {
        return {
          isSuccess: false,
          error: {
            name: 'Empty product',
            message: 'Empty product',
          },
        };
      }

      if (!offer.title) {
        offer.title = products.data[0].name;
      }

      if (!data) {
        throw new Error('Request empty');
      }

      const newOffer = await this.save<INewOffer, Offer>(offer);

      await this.amqpService.sendNotification({
        userId: data[0].userId,
        type: OfferNotificationType[newOffer.status],
        message: offer.title,
        subjectId: newOffer.id,
      });

      return {
        isSuccess: true,
      };
    } catch (error) {
      return {
        isSuccess: false,
        error,
      };
    }
  }

  async getOffers(request: IGetOffersRequest): Promise<IGetOffersResponse> {
    const { userId, offerId, page, perPage, sort, statuses } = request;
    const skip = perPage ? perPage * (page - 1) : 1;
    try {
      const [offers, totalCount] = await this.findAndCountByCriteria<IOffer>({
        relations: ['deal'],
        where: {
          ...(userId ? { userId: userId } : {}),
          ...(offerId ? { id: offerId } : {}),
          ...(statuses ? { status: In(statuses) } : {}),
        },
        order: {
          ...(sort
            ? Object.assign(
                {},
                ...sort.map((sortArray) => {
                  return { [sortArray.orderName]: sortArray.orderBy };
                }),
              )
            : {}),
        },
        ...(page ? { skip } : {}),
        ...(perPage ? { take: perPage } : {}),
      });
      return {
        data: offers,
        pageInfo: {
          page,
          perPage,
          totalCount,
          totalPageCount: Math.ceil(totalCount / (perPage ? perPage : 1)),
        },
      };
    } catch (error) {
      return {
        data: [],
        pageInfo: {
          page,
          perPage,
          totalCount: 0,
          totalPageCount: 0,
        },
        error,
      };
    }
  }

  async getOffersConsumer(
    request: IGetOffersConsumerRequest,
  ): Promise<IGetOffersResponse> {
    const { requestIds, page, perPage, offerId, sort, statuses } = request;
    const skip = perPage ? perPage * (page - 1) : 1;
    try {
      const [offers, totalCount] = await this.findAndCountByCriteria<IOffer>({
        relations: ['deal'],
        where: {
          requestId: In(requestIds),
          ...(offerId ? { id: offerId } : {}),
          ...(statuses ? { status: In(statuses) } : {}),
        },
        order: {
          ...(sort
            ? Object.assign(
                {},
                ...sort.map((sortArray) => {
                  return { [sortArray.orderName]: sortArray.orderBy };
                }),
              )
            : {}),
        },
        ...(page ? { skip } : {}),
        ...(perPage ? { take: perPage } : {}),
      });
      return {
        data: offers,
        pageInfo: {
          page,
          perPage,
          totalCount,
          totalPageCount: Math.ceil(totalCount / (perPage ? perPage : 1)),
        },
      };
    } catch (error) {
      return {
        data: [],
        pageInfo: {
          page,
          perPage,
          totalCount: 0,
          totalPageCount: 0,
        },
        error,
      };
    }
  }

  private async validateForUpdateOffer(
    offer: IUpdateOffer,
  ): Promise<IUpdateOfferResponse> {
    const { status, id } = offer;
    const currentOffer = await this.findOne<IOffer>({
      where: {
        id,
      },
    });
    if (status && currentOffer.status === EOfferStatus.CONFIRMED) {
      return {
        isSuccess: false,
        error: {
          code: 'CONFIRMED STATUS NOT CHANGE',
          message: ['CONFIRMED STATUS NOT CHANGE'],
        },
      };
    }
    return {
      isSuccess: true,
    };
  }

  async updateOffer(
    request: IUpdateOfferRequest,
  ): Promise<IUpdateOfferResponse> {
    try {
      const {
        offer: {
          id,
          status,
          description,
          isDraft,
          additionalConditions,
          price,
          cover,
          media,
          title,
        },
      } = request;

      const validateResult = await this.validateForUpdateOffer(request.offer);

      if (!validateResult.isSuccess) {
        return validateResult;
      }

      const setting = await this.findOneByCriteria<IUpdateOffer>({
        where: { id },
      });
      const updatedOffer = await this.save<IUpdateOffer, Offer>({
        ...setting,
        ...(status ? { status } : {}),
        ...(description ? { description } : {}),
        ...(isDraft ? { isDraft } : {}),
        ...(additionalConditions ? { additionalConditions } : {}),
        ...(media ? { media } : {}),
        ...(price ? { price } : {}),
        ...(cover ? { cover } : {}),
        ...(title ? { title } : {}),
      });

      const { data } = await this.requestService.getRequestsById({
        requestId: updatedOffer.requestId,
      });

      let sendUser = data[0].userId;

      if (status == EOfferStatus.CANCELED_BY_CONSUMER) {
        sendUser = updatedOffer.userId;
      }

      if (status && status !== EOfferStatus.CONFIRMED) {
        await this.amqpService.sendNotification({
          userId: sendUser,
          type: OfferNotificationType[status],
          message: updatedOffer.title,
          subjectId: updatedOffer.id,
        });
      }

      return {
        isSuccess: true,
      };
    } catch (error) {
      return {
        isSuccess: false,
        error,
      };
    }
  }

  async deleteOffer(
    request: IDeleteOfferRequest,
  ): Promise<IDeleteOfferResponse> {
    try {
      const { id } = request;
      await this.remove(id);
      return {
        isSuccess: true,
      };
    } catch (error) {
      return {
        isSuccess: false,
        error,
      };
    }
  }
}
