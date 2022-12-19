import { ISort } from '../../../common/types';
import { IDeal } from '../../deal/interfaces/deal.interface';

export enum EOfferStatus {
  CANCELED = 'CANCELED',
  CONFIRMED = 'CONFIRMED',
  CREATED = 'CREATED',
  IN_PROGRESS = 'IN_PROGRESS',
  IN_DEAL = 'IN_DEAL',
  IS_HOLD = 'IS_HOLD',
  CANCELED_BY_CONSUMER = 'CANCELED_BY_CONSUMER',
  CANCELED_BY_SELLER = 'CANCELED_BY_SELLER',
}

export interface IError {
  code: string;
  message: Array<string>;
}

export interface INewOffer {
  userId: string;
  requestId: string;
  productId: string;
  price: number;
  description: string;
  ecogood: boolean;
  isDraft: boolean;
  status?: EOfferStatus;
  additionalConditions?: string;
  cover?: string;
  title: string;
  media?: Media;
}
export const OfferNotificationType = {
  [EOfferStatus.IN_PROGRESS]: 'OFFER_IN_PROGRESS',
  [EOfferStatus.CREATED]: 'NEW_OFFER_CREATED',
  [EOfferStatus.CANCELED]: 'OFFER_CANCELED',
  [EOfferStatus.CANCELED_BY_CONSUMER]: 'OFFER_CANCELED',
  [EOfferStatus.CANCELED_BY_SELLER]: 'OFFER_CANCELED',
  [EOfferStatus.CONFIRMED]: 'OFFER_CONFIRMED',
};

export type NotificationMessage = {
  userId: string;
  type: string;
  message: string;
  subjectId: string;
};

export interface IOffer extends INewOffer {
  id: string;
  createdAt?: string;
  updatedAt?: string;
  deal?: IDeal;
}

export interface ICreateOfferRequest {
  offer: INewOffer;
}
export interface ICreateOfferResponse {
  isSuccess: boolean;
  error?: Error;
}

export interface IGetOffersRequest {
  sort?: ISort[];
  userId?: string;
  offerId?: string;
  statuses?: EOfferStatus[];
  page?: number;
  perPage?: number;
}

export interface IPageInfo {
  page: number;
  perPage: number;
  totalCount: number;
  totalPageCount: number;
}

export interface IGetOffersResponse {
  data: IOffer[];
  pageInfo: IPageInfo;
  error?: IError;
}

export interface IUpdateOffer {
  id: string;
  status?: EOfferStatus;
  isDraft?: boolean;
  additionalConditions?: string;
  description?: string;
  price?: number;
  cover?: string;
  title?: string;
  media?: Media;
}

export interface IUpdateOfferRequest {
  offer: IUpdateOffer;
}
export interface IUpdateOfferResponse {
  isSuccess: boolean;
  error?: IError;
}

export interface IDeleteOfferRequest {
  id: string;
}
export interface IDeleteOfferResponse {
  isSuccess: boolean;
  error?: IError;
}

export interface Media {
  fileOriginalName: string;
  fileNameMinio: string;
  mimetype: string;
  bucket: typeof bucketType;
}

const bucketType = {
  OFFER: 'offer',
  PRODUCT: 'product',
};

export interface IGetOffersConsumerRequest {
  sort?: ISort[];
  statuses?: EOfferStatus[];
  offerId?: string;
  requestIds: string[];
  page?: number;
  perPage?: number;
}
