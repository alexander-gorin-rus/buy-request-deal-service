import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { GrpcRequestService } from './grpc.request.service';
import { ClientGrpc } from '@nestjs/microservices';
import configuration from '../../config/configuration';
import { ConfigService } from '@nestjs/config';
import {
  GetDataResponseWithPage,
  IGetRequests,
  IRequest,
  IRequestServiceClient,
  ICommonIsSuccessResponse,
} from './interfaces/request.interface';

const {
  packageNames: { REQUEST_PACKAGE },
} = configuration();

@Injectable()
export class RequestGrpcService
  extends GrpcRequestService
  implements OnModuleInit, IRequestServiceClient
{
  private requestService: IRequestServiceClient;

  constructor(
    @Inject(REQUEST_PACKAGE.name) private userClient: ClientGrpc,
    private readonly configService: ConfigService,
  ) {
    super(userClient);
  }

  onModuleInit() {
    this.requestService = this.userClient.getService<IRequestServiceClient>(
      this.configService.get('packageNames').REQUEST_PACKAGE.packageName,
    );
  }

  async getRequestsById(data: IGetRequests) {
    const result = await this.getResponse<
      GetDataResponseWithPage<IRequest>,
      IRequestServiceClient,
      IGetRequests
    >(this.requestService, 'getRequestsById', data);
    return { ...result, data: result.data || [] };
  }

  async updateRequest(data: Partial<IRequest>) {
    return await this.getResponse<
      ICommonIsSuccessResponse,
      IRequestServiceClient,
      { request: Partial<IRequest> }
    >(this.requestService, 'updateRequest', { request: data });
  }
}
