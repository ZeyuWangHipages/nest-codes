import { Module } from '@nestjs/common';
import { utilities, WinstonModule, WinstonModuleOptions } from 'nest-winston';
import { ConfigService } from '@nestjs/config';
import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import { LogEnum } from '../enums';
import { LogsController } from './logs.controller';
import { LogsService } from './logs.service';

@Module({
  imports: [
    WinstonModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const consoleTransport = new winston.transports.Console({
          level: 'info',
          format: winston.format.combine(
            winston.format.timestamp(),
            utilities.format.nestLike(),
          ),
        });
        const dailyTransport = new DailyRotateFile({
          level: 'warn',
          dirname: 'logs',
          filename: 'application-%DATE%.log',
          datePattern: 'YYYY-MM-DD-HH',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
          format: winston.format.combine(
            winston.format.timestamp(),
            utilities.format.nestLike(),
          ),
        });
        const dailyInfoTransport = new DailyRotateFile({
          level: configService.get(LogEnum.LOG_LEVEL),
          dirname: 'logs',
          filename: 'info-%DATE%.log',
          datePattern: 'YYYY-MM-DD-HH',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
          format: winston.format.combine(
            winston.format.timestamp(),
            utilities.format.nestLike(),
          ),
        });

        return {
          transports: [
            consoleTransport,
            ...(configService.get(LogEnum.LOG_ON)
              ? [dailyTransport, dailyInfoTransport]
              : []),
          ],
        } as WinstonModuleOptions;
      },
    }),
  ],
  controllers: [LogsController],
  providers: [LogsService],
})
export class LogsModule {}
