import { IDefaultDBItem, IPaginatedArray, ISort } from '../../../common/types';

export interface IProductServiceClient {
  getProducts(request: IGetProductsRequest): Promise<IPaginatedArray<IProduct>>;
}

export enum IProductStatus {
  CANCELED = 'CANCELED',
  CONFIRMED = 'CONFIRMED',
  ON_MODERATION = 'ON_MODERATION',
}

export interface IMedia {
  fileOriginalName: string;
  mimetype: string;
  fileNameMinio: string;
}
export interface INewProduct {
  userId: string;
  production: string;
  name: string;
  model: string;
  tags: string[];
  productionGuarantee: string;
  description: string;
  rating?: number;
  media: IMedia[];
  cover: string;
  status?: IProductStatus;
}

export interface IProduct extends INewProduct, IDefaultDBItem {}

export interface IGetProductsRequest {
  sort?: ISort[];
  userId?: string;
  productId?: string;
  page?: number;
  perPage?: number;
  status?: string;
}
