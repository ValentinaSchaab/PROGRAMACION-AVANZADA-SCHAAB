import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { CreatePaymentSessionDto } from './dto/create-payment-session.dto';

@Injectable()
export class PaymentsService {
  private readonly stripe: Stripe;
  private readonly logger = new Logger(PaymentsService.name);

  constructor(private readonly configService: ConfigService) {
    this.stripe = new Stripe(
      this.configService.get<string>('STRIPE_SECRET')!,
    );
  }

  async createPaymentSession(createPaymentSessionDto: CreatePaymentSessionDto) {
    const { currency, items, orderId } = createPaymentSessionDto;

    const lineItems = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    const session = await this.stripe.checkout.sessions.create({
      payment_intent_data: {
        metadata: {
          orderId: orderId,
        },
      },
      line_items: lineItems,
      mode: 'payment',
      success_url: this.configService.get<string>('STRIPE_SUCCESS_URL'),
      cancel_url: this.configService.get<string>('STRIPE_CANCEL_URL'),
    });

    return {
      cancelUrl: session.cancel_url,
      successUrl: session.success_url,
      url: session.url,
    };
  }



async stripeWebhook(req: any) {
    this.logger.log('👉 ¡LLEGÓ UNA PETICIÓN AL WEBHOOK!'); // 👈 Agregá esta línea acá

    const sig = req.headers['stripe-signature'];
    const endpointSecret = this.configService.get<string>('STRIPE_ENDPOINT_SECRET');
    
    let event: Stripe.Event;


    try {
      // Validamos la firma digital del webhook con el rawBody
      event = this.stripe.webhooks.constructEvent(
        req.rawBody,
        sig,
        endpointSecret!,
      );
    } catch (err: any) {
      throw new BadRequestException(`Webhook Error: ${err.message}`);
    }

    // Escuchamos el evento cuando el pago fue confirmado
    switch (event.type) {
      case 'charge.succeeded': {
        const charge = event.data.object as Stripe.Charge;
        const orderId = charge.metadata?.orderId;
        this.logger.log(`¡Pago verificado exitosamente para la orden #${orderId}!`);
        break;
      }
      default:
        this.logger.log(`Evento recibido: ${event.type}`);
    }

    return { received: true };
  }
}