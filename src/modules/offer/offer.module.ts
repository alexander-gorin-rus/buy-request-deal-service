import { Module } from '@nestjs/common';
import { OfferController } from './offer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Offer from './offer.entity';
import { OfferService } from './offer.service';
import configuration from '../../config/configuration';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { AmqpModule } from '../../amqp/amqp.module';
import { AmqpService } from '../../amqp/amqp.service';
import { RequestGrpcService } from '../../common/services/request.grpc-service';
import { ClientsModule } from '@nestjs/microservices';
import { ProductGrpcService } from '../../common/services/product.grpc-service';

const { amqp, clients } = configuration();

@Module({
  imports: [
    TypeOrmModule.forFeature([Offer]),
    RabbitMQModule.forRoot(RabbitMQModule, amqp.config),
    ClientsModule.register(clients),
    AmqpModule,
  ],
  controllers: [OfferController],
  providers: [
    OfferService,
    AmqpService,
    RequestGrpcService,
    ProductGrpcService,
  ],
  exports: [TypeOrmModule],
})
export class OfferModule {}
