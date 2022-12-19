export interface IPageInfo {
  page: number;
  perPage: number;
  totalCount: number;
  totalPageCount: number;
}

export interface ISort {
  orderBy: 'ASC' | 'DESC';
  orderName: string;
}

export enum NotificationType {
  UNKNOWN_NOTIFICATION_TYPE = 'UNKNOWN_NOTIFICATION_TYPE',
  NEW_REQUEST_CREATED = 'NEW_REQUEST_CREATED',
  NEW_OFFER_CREATED = 'NEW_OFFER_CREATED',
  NEW_MESSAGE = 'NEW_MESSAGE',
  DEAL_IN_PROGRESS = 'DEAL_IN_PROGRESS',
  DEAL_PAID = 'DEAL_PAID',
  DEAL_CANCELED = 'DEAL_CANCELED',
  DEAL_COMPLETED = 'DEAL_COMPLETED',
  DEAL_CUSTOMER_PAID = 'DEAL_CUSTOMER_PAID',
  DEAL_DISPUTE = 'DEAL_DISPUTE',
  OFFER_CANCELED = 'OFFER_CANCELED',
  OFFER_CONFIRMED = 'OFFER_CONFIRMED',
  OFFER_IN_PROGRESS = 'OFFER_IN_PROGRESS',
  OFFER_IS_HOLD = 'OFFER_IS_HOLD',
}

export interface GrpcRequestInterface {
  getResponse<R, C, M>(client: C, grpcFunction: string, message: M): Promise<R>;
}

export interface IDefaultDBItem {
  id: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IPaginatedArray<T> {
  data?: T[] | [];
  pageInfo: IPageInfo;
}
