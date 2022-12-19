import { IDefaultDBItem, IPageInfo, ISort } from '../../types';
import { IError } from '../../../modules/offer/interfaces/offer.interface';

export interface IRequestServiceClient {
  getRequestsById(
    data: IGetRequests,
  ): Promise<GetDataResponseWithPage<IRequest>>;
}

export type GetDataResponseWithPage<D> =
  | ISuccessDataWithPage<D>
  | IFailureDataWithPage;

interface ISuccessDataWithPage<D> {
  data: D[];
  pageInfo: IPageInfo;
}

interface IFailureDataWithPage {
  data: [];
  pageInfo: IPageInfo;
  error: IError;
}

export interface INewRequest {
  description: string;
  budget: number;
  tags: string[];
  userId: string;
  products: string[];
  isDraft: boolean;
  readyForAnalogues: boolean;
  cover: string;
  status: string;
}

export interface IRequest extends INewRequest, IDefaultDBItem {}

export type ICreateRequestRequest = INewRequest;

export interface IGetRequests {
  sort?: ISort[];
  userId?: string;
  requestId?: string;
  page?: number;
  perPage?: number;
}

export interface ICommonIsSuccessResponse {
  isSuccess: boolean;
  error?: IError;
}

export type ICreateRequestResponse = ICommonIsSuccessResponse;
