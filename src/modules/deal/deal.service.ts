import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AmqpService } from '../../amqp/amqp.service';
import { CommonService } from '../../common/common.service';
import Deal from './deal.entity';
import {
  ICreateDealRequest,
  CreateDealResponse,
  IGetDialsRequest,
  GetDialsResponse,
  INewDeal,
  IUpdateDeal,
  IUpdateDealRequest,
  UpdateDealResponse,
  DealNotificationType,
} from './interfaces/deal.interface';
import { Brackets } from 'typeorm';
import { NotificationMessage } from '../offer/interfaces/offer.interface';
import { RequestGrpcService } from 'src/common/services/request.grpc-service';
import { OfferService } from '../offer/offer.service';

@Injectable()
export class DealService extends CommonService {
  constructor(
    @InjectRepository(Deal) private dealRepository: Repository<Deal>,
    private config: ConfigService,
    private readonly amqpService: AmqpService,
    private readonly requestService: RequestGrpcService,
    private readonly offerService: OfferService,
  ) {
    super(dealRepository);
  }

  async createDeal(request: ICreateDealRequest): Promise<CreateDealResponse> {
    try {
      const { deal } = request;
      const newDeal = await this.save<INewDeal, Deal>(deal);
      const offers = await this.offerService.getOffers({
        offerId: deal.offerId,
      });

      const message: NotificationMessage = {
        userId: newDeal.sellerId,
        type: DealNotificationType.NEW_DEAL_CREATED,
        message: offers.data[0].title,
        subjectId: newDeal.id,
      };

      await this.amqpService.sendNotification(message);
      await this.requestService.updateRequest({
        id: newDeal.requestId,
        status: 'DISABLE',
      });
      return {
        isSuccess: true,
        id: newDeal.id,
      };
    } catch (error) {
      return {
        isSuccess: false,
        error,
      };
    }
  }

  async updateDeal(request: IUpdateDealRequest): Promise<UpdateDealResponse> {
    try {
      const { deal, userId } = request;

      await this.save<IUpdateDeal, Deal>(deal);

      const updatedDeal = await this.dealRepository.findOne({
        where: { id: deal.id },
      });

      const userIds = [updatedDeal.consumerId, updatedDeal.sellerId];

      const offers = await this.offerService.getOffers({
        offerId: updatedDeal.offerId,
      });

      const message: NotificationMessage = {
        userId: userIds.find((item) => item !== userId),
        type: DealNotificationType[updatedDeal.status],
        message: offers.data[0].title,
        subjectId: updatedDeal.id,
      };

      await this.amqpService.sendNotification(message);

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

  async getDeals(data: IGetDialsRequest): Promise<GetDialsResponse> {
    const { userId, dealId, page, perPage, sort, statuses } = data;
    const skip = perPage ? perPage * (page - 1) : 1;
    try {
      let query = this.dealRepository.createQueryBuilder('deal');
      if (statuses) {
        query = query.andWhere('deal.status IN (:...statuses)', { statuses });
      }
      if (dealId) {
        query = query.andWhere('id = :dealId', { dealId });
      }
      query = query.andWhere(
        new Brackets((qb) => {
          qb.where('deal.sellerId = :userId', { userId }).orWhere(
            'deal.consumerId = :userId',
            { userId },
          );
        }),
      );
      if (sort) {
        for (const [index, value] of sort.entries()) {
          if (index == 0) {
            query.orderBy('deal.' + value.orderName, value.orderBy);
            continue;
          }
          query.addOrderBy('deal.' + value.orderName, value.orderBy);
        }
      }
      if (page && perPage) {
        query = query.skip(skip).take(perPage);
      }
      const [currentDeals, currentTotalCount] = await query.getManyAndCount();
      return {
        data: currentDeals,
        pageInfo: {
          page,
          perPage,
          totalCount: currentTotalCount,
          totalPageCount: Math.ceil(
            currentTotalCount / (perPage ? perPage : 1),
          ),
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
}
