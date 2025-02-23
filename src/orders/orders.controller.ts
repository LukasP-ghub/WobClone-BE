import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../decorators/roles.decorator';
import { UserObj } from '../decorators/user-obj.decorator';
import { RolesGuard } from '../guards/roles.guard';
import { User } from '../user/entities/user.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';

@ApiTags('Orders') // Grupowanie w dokumentacji Swaggera
@ApiBearerAuth() // Wymaganie tokena JWT
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @Post()
  @Roles('admin', 'user')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiOperation({ summary: 'Create a new order' }) // Krótki opis metody
  @ApiResponse({ status: 201, description: 'Order successfully created' }) // Opis możliwego statusu odpowiedzi
  @ApiResponse({ status: 403, description: 'Forbidden' })
  create(
    @Body() createOrderDto: CreateOrderDto,
    @UserObj() user: User) {
    return this.ordersService.create(user, createOrderDto);
  }
}
