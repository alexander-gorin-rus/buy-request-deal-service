import { Module } from '@nestjs/common';
import { DealController } from './deal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Deal from './deal.entity';
import { DealService } from './deal.service';
import { ConfigService } from '@nestjs/config';
import { AmqpService } from '../../amqp/amqp.service';
import { AmqpModule } from '../../amqp/amqp.module';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import configuration from '../../config/configuration';
import { RequestGrpcService } from 'src/common/services/request.grpc-service';
import { ClientsModule } from '@nestjs/microservices';
import { OfferService } from '../offer/offer.service';
import { OfferModule } from '../offer/offer.module';
import { ProductGrpcService } from '../../common/services/product.grpc-service';

const { amqp, clients } = configuration();

@Module({
  imports: [
    TypeOrmModule.forFeature([Deal]),
    RabbitMQModule.forRoot(RabbitMQModule, amqp.config),
    ClientsModule.register(clients),
    AmqpModule,
    OfferModule,
  ],
  controllers: [DealController],
  providers: [
    DealService,
    RequestGrpcService,
    ConfigService,
    AmqpService,
    OfferService,
    ProductGrpcService,
  ],
  exports: [TypeOrmModule],
})
export class DealsModule {}
