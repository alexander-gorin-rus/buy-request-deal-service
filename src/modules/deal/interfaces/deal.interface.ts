import { IPageInfo, ISort } from '../../../common/types';

export enum EDealStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  PAID = 'PAID',
  CANCELED = 'CANCELED',
  COMPLETED = 'COMPLETED',
  CUSTOMER_PAID = 'CUSTOMER_PAID',
  DISPUTE = 'DISPUTE',
}

export interface INewDeal {
  requestId: string;
  offerId: string;
  sellerId: string;
  consumerId: string;
  status?: EDealStatus;
  additionalConditions?: string;
  expiratedAt?: string;
}

export interface IDeal {
  id: string;
  requestId: string;
  offerId: string;
  sellerId: string;
  consumerId: string;
  status: EDealStatus;
  additionalConditions: string;
  expiratedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface IGetDialsRequest {
  sort?: ISort[];
  userId: string;
  dealId: string;
  statuses: EDealStatus[];
  page?: number;
  perPage?: number;
}

export type GetDialsResponse =
  | {
      data: IDeal[];
      pageInfo: IPageInfo;
      error?: Error;
    }
  | {
      data: [];
      pageInfo: IPageInfo;
      error: Error;
    };

export interface ICreateDealRequest {
  deal: INewDeal;
}

export type CreateDealResponse =
  | {
      isSuccess: true;
      id: string;
      error?: Error;
    }
  | {
      isSuccess: false;
      error: Error;
    };

export interface IUpdateDeal {
  id: string;
  status: EDealStatus;
  additionalConditions?: string;
}

export interface IUpdateDealRequest {
  deal: IUpdateDeal;
  userId: string;
}

export type UpdateDealResponse =
  | {
      isSuccess: true;
    }
  | {
      isSuccess: false;
      error: Error;
    };

export interface Error {
  code: string;
  message: Array<string>;
}

export const DealNotificationType = {
  NEW_DEAL_CREATED: 'NEW_DEAL_CREATED',
  [EDealStatus.IN_PROGRESS]: 'DEAL_IN_PROGRESS',
  [EDealStatus.CANCELED]: 'DEAL_CANCELED',
  [EDealStatus.PAID]: 'DEAL_PAID',
  [EDealStatus.COMPLETED]: 'DEAL_COMPLETED',
  [EDealStatus.CUSTOMER_PAID]: 'DEAL_CUSTOMER_PAID',
};
