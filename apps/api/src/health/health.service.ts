import { Injectable } from '@nestjs/common';
import type { HealthStatus } from './health.types';

@Injectable()
export class HealthService {
  /**
   * 返回值用于存活探针与前端启动自检，不含任何敏感信息。
   */
  getStatus(): HealthStatus {
    return {
      status: 'ok',
      service: 'measure-equipment-api',
      timestamp: new Date().toISOString(),
    };
  }
}
