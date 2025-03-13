import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { seed } from 'prisma/seed';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*', // Replace with the origin you want to allow
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed HTTP methods
    allowedHeaders: 'Content-Type, Authorization', // Allowed headers
    credentials: true, // If you want to allow cookies or credentials
  });
  try {
    await seed();
  } catch (error) {
    console.error('Error seeding database:', error);
  }
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
