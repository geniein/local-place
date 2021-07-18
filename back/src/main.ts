import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import initBlockServer from './server/block/initBlockServer'

const blockPort: number = parseInt(process.env.BLOCK_PORT) || 3001;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.enableCors();
  await app.listen(3055);
}

function blockstrap() {
  initBlockServer(blockPort); 
}

bootstrap();
blockstrap();
