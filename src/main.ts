import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './core';
import { ApplicationModule } from './shared/project/application.module';
import { ApplicationService } from './shared/project/application.service';
import { DataService } from './shared/project/data/data.service';

const docsEndpoint = '/';
const title = 'Grupo de Estudios';
const descripcion = '';
const app_port = process.env.HOST_PORT ? Number(process.env.HOST_PORT) : 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: '*' });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const moduleRef = app.select(AppModule);
  const reflector = moduleRef.get(Reflector);
  app.useGlobalInterceptors(new ResponseInterceptor(reflector));

  const config = new DocumentBuilder()
    .setTitle(title)
    .setDescription(descripcion)
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(docsEndpoint, app, document);
  
  const databaseCreation = app
    .select(ApplicationModule)
    .get(ApplicationService);
  await databaseCreation.query();

  const dataCreation = app
    .select(ApplicationModule)
    .get(DataService);
  await dataCreation.query();
  await app.listen(app_port);
  Logger.log(`${title} - PORT: ${app_port}`);
}
bootstrap();
