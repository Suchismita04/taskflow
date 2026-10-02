import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express'
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Access configuration service
  const configService = app.get(ConfigService);

  const PORT = configService.get<number>('PORT', 3000);
  const HOST = configService.get<string>('HOST', '0.0.0.0');

  await app.listen(PORT, HOST, () => {
    console.log(`db port: ${configService.get<string>('DB_PORT')}`)
    console.log(`Hurray! our app is running on http://${HOST}:${process.env.PORT}`)
  });
}
bootstrap();
