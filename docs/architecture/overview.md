# 项目架构总览

## 1. 业务定位与核心场景
- **项目名称**：Measure-Equipment（量仪管理）
- **目标用户与核心闭环**：测量中心人员维护量具台账并负责放行；使用单位负责人管理本单位人员授权；检验员在产品检验中登记实测值并提交正式记录；品质负责人维护检验模板与异常处置。核心闭环为「量具资格核验 → 使用确认 → 正式检验提交 → 批次与量具双向追溯」。
- **首期（MVP）边界**：
  - 包含：采购登记、验收与首次放行、领用归还、调拨、周期校验（内校/外校/免校）、维修送检隔离、降级、停用、丢失、报废；人员与使用单位授权；产品检验模板与样品项目、用具核验、正式提交与更正；旧台账迁移预检与导入；不合格量具影响追溯。
  - 明确排除：ERP 集成、审批付款、库存财务、整套 QMS/MES/SPC、电子签章、设备联网、离线放行，以及真实台账与真实产品数据入库。

## 2. 技术栈与目录划分
- **后端**：NestJS 10 + TypeScript，统一 `/api/v1` 前缀，按领域模块组织（Controller 路由与入参校验 / Service 业务逻辑 / Repository 数据访问）。
- **前端**：Vue 3 + TypeScript + Vite + Element Plus；状态管理按需引入 Pinia，接口封装在 `src/api/`。
- **数据与基础设施**：首期使用关系型数据库（PostgreSQL，本地开发可用 Docker 启动），通过 Repository 层隔离 ORM；开发、CI 与 LoopForge 一律使用合成数据。
- **目录职责**：
  - `apps/api/src/<domain>/`：后端领域模块（module / controller / service / repository / dto / `__tests__`）
  - `apps/web/src/`：`api/` 接口封装、`views/` 路由页面、`components/` 业务组件、`composables/` 组合式函数、`utils/feedback.ts` 提示收口
  - `docs/`：架构与需求文档；`scripts/`：确定性门禁脚本；`.agents/skills/`：Agent 技能

## 3. 核心接口契约与非功能约束
- **统一响应/错误格式**：成功响应由全局拦截器包装为 `{ code: 0, message: "ok", data, requestId }`；业务异常统一抛 `BizException(ErrorCode, message)` 并由全局过滤器转换。错误码至少区分：未放行、已停用、校验过期或缺失、免校未获批准、单位无权、人员无权、精度或范围不匹配。
- **鉴权与多租户隔离方式**：JWT 鉴权 + 服务端 RBAC；数据范围按使用单位收敛，列表、详情、报表与导出使用同一数据范围过滤，禁止仅依赖客户端传参。
- **性能/时延基线**：常规查询接口 P95 < 200ms（单机合成数据基线）；校验到期判定按 `Asia/Shanghai` 时区实时计算，不依赖定时任务是否执行。

## 4. 门禁适配清单（对应 `harness.config.json`）
- `commands.lint`：`npm run lint`（ESLint 9 flat config，覆盖 TypeScript 与 Vue SFC）
- `commands.typecheck`：`npm run typecheck`（api 用 `tsc --noEmit`，web 用 `vue-tsc --noEmit`）
- `commands.testUnit`：`npm run test`（Vitest，按 workspace 分别执行 api 与 web 单测；产物由 CI 归档到 `artifacts/`）
- `commands.testE2e`：暂未配置（首期由集成验收阶段补充）
