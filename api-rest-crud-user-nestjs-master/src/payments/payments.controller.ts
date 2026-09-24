import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentSessionDto } from './dto/create-payment-session.dto';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('create-payment-session')
  createPaymentSession(@Body() createPaymentSessionDto: CreatePaymentSessionDto) {
    return this.paymentsService.createPaymentSession(createPaymentSessionDto);
  }

  @Get('success')
  success() {
    return {
      ok: true,
      message: 'Pago realizado con éxito',
    };
  }

  @Get('cancel')
  cancel() {
    return {
      ok: false,
      message: 'Pago cancelado por el usuario',
    };
  }

  @Post('webhook')
  async stripeWebhook(@Req() req: any) {
    return this.paymentsService.stripeWebhook(req);
  }
}