import { Global, Logger, Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import * as joi from 'joi';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration, { DatabaseConfig } from '../config/configuration';
import * as process from 'process';
import { LogsModule } from './logs/logs.module';
import { RolesService } from './roles/roles.service';
import { RolesController } from './roles/roles.controller';
import { RolesModule } from './roles/roles.module';
import OrmConfig from "../ormconfig";

const envFilePath = [
  `config/.env.${process.env.NODE_ENV || 'development'}`,
  'config/.env',
];

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath,
      load: [configuration],
      validationSchema: joi.object({
        ENVIRONMENT: joi
          .string()
          .valid('Development', 'Production')
          .default('Development'),
        DATABASE_HOST: joi.string().required(),
        DATABASE_PORT: joi.number().default(3306),
        DATABASE_USERNAME: joi.string().required(),
        DATABASE_PASSWORD: joi.string().required(),
        DATABASE_DBNAME: joi.string().required(),
      }),
    }),
    TypeOrmModule.forRoot(OrmConfig),
    UserModule,
    LogsModule,
    RolesModule,
  ],
  controllers: [RolesController],
  providers: [Logger, RolesService],
  exports: [Logger],
})
export class AppModule {}
