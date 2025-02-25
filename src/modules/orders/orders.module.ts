import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EbooksModule } from '../ebooks/ebooks.module';
import { UserModule } from '../user/user.module';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order_item.entity';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), TypeOrmModule.forFeature([OrderItem]), forwardRef(() => EbooksModule), forwardRef(() => UserModule)],
  controllers: [OrdersController],
  providers: [OrdersService]
})
export class OrdersModule { }
