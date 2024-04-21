import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { join } from 'path';

async function bootstrap() {
  /*
   const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/api/v1');
  await app.listen(3000);
  */

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'user',
        protoPath: join(__dirname, 'proto/user.proto'),
        url: '0.0.0.0:50052',
      },
    },
  );

  app.listen();
}
bootstrap();
