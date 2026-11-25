import { describe, expect, it } from 'vitest';
import { HealthService } from '../health.service';

describe('HealthService [AC-1] 健康检查返回稳定结构', () => {
  it('返回 ok 状态且带服务标识', () => {
    const service = new HealthService();

    const result = service.getStatus();

    expect(result.status).toBe('ok');
    expect(result.service).toBe('measure-equipment-api');
  });

  it('返回 ISO 8601 时间戳，便于监控侧解析', () => {
    const service = new HealthService();

    const result = service.getStatus();

    expect(Number.isNaN(Date.parse(result.timestamp))).toBe(false);
    expect(new Date(result.timestamp).toISOString()).toBe(result.timestamp);
  });
});
