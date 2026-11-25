import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

/**
 * 启动入口。端口通过 PORT 环境变量注入，默认 3000。
 * 统一走 /api/v1 前缀，便于后续网关与前端代理对接。
 */
async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  const port = Number(process.env.PORT ?? 3000);
  await app.listen(port);
}

void bootstrap();
