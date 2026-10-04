import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { resolveEnvPath } from './common/utils/env-resolver.util';
import resolveDbType from './common/utils/db-type-resolver.util';



@Module({
  imports: [
    // Application configuration
    ConfigModule.forRoot({
      envFilePath: resolveEnvPath(),
      isGlobal: true
    }),
    // Database configuration
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: resolveDbType(configService.get<string>('DB_TYPE')),
        host: configService.get<string>('DB_HOST'),
        port: Number(configService.get<string>('DB_PORT')),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        options: {
          encrypt:true,
          trustServerCertificate: true, //resolveEnvPath().includes(`.env.${process.env.APP_ENV ?? 'local'}`)
        },
        autoLoadEntities: true,
        synchronize: configService.get<string>('DB_SYNC') === 'YES' ? true : false
      }),
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
