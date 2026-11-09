import { NestFactory } from '@nestjs/core';
import { AppModule} from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
  });

  // Habilita CORS para permitir que tu frontend en Expo (localhost:8081) se conecte sin problemas
  app.enableCors();

  // Escucha en el puerto 3000 (o el puerto que utilices para tu API)
  await app.listen(3000);
}

bootstrap().catch((err) => console.error(err));
