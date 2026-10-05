import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  // rawBody: true es indispensable para validar la firma de los webhooks de Stripe
  const app = await NestFactory.create(AppModule, { rawBody: true });

  // Configuración global de validación DTO
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const port = process.env.PORT || 3003;
  await app.listen(port);
  console.log(`Microservicio de pagos corriendo en el puerto ${port}`);
}
bootstrap();