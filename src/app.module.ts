import { Module } from '@nestjs/common';
import { IndexModule } from './modules/index.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './core';
import { WinstonModule } from 'nest-winston/dist';
import * as winston from 'winston';
import * as path from 'path';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './shared/config/config';
import { ApplicationModule } from './shared/project/application.module';
import { DataService } from './shared/project/data/data.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    WinstonModule.forRoot({
      level: 'debug',
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.json(),
      ),
      transports: [
        new winston.transports.File({
          dirname: path.join(__dirname, './../log/debug/'),
          filename: 'debug.log',
          level: 'debug',
        }),
        new winston.transports.File({
          dirname: path.join(__dirname, './../log/error/'),
          filename: 'error.log',
          level: 'error',
        }),
        new winston.transports.File({
          dirname: path.join(__dirname, './../log/info/'),
          filename: 'info.log',
          level: 'info',
        }),
        new winston.transports.Console({ level: 'debug' }),
      ],
    }),
    IndexModule,
    ApplicationModule,
  ],
  providers: [{ provide: APP_FILTER, useClass: AllExceptionsFilter }, DataService],
})
export class AppModule {}
