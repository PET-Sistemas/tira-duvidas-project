# AI coding guide for this repo

This monorepo contains a NestJS backend (`back-tiraduvidas`) and a React frontend (`front`), orchestrated via Docker Compose. Use these conventions to stay productive and compatible with the current codebase.

## Architecture in a nutshell
- Backend (NestJS): feature-first layout under `back-tiraduvidas/src/http/**` and `src/auth/**`.
  - Auth: `src/auth` (login, register, confirm, forgot/reset password, JWT strategy).
  - Domain features: `src/http/<feature>/{controller,service,dto,entities,repositories}`.
  - Persistence: TypeORM. Migrations live in `src/database/migrations` and configuration in `src/database/typeorm-config.service.ts` and `ormconfig.json`.
  - Email: `src/http/mail/mail.service.ts` wraps outbound email and optional DB logging via `MailRepositoryTypeorm`.
  - Caching/short-lived tokens: Redis service in `src/config/redis.ts`.
- Frontend (React): `front/src/**` with services under `src/services/*.ts` calling the backend.
- Docker: `docker-compose.yml` runs api (Nest), db (Postgres), and frontend.

## Critical flows (project-specific)
- Password reset
  - New flow (preferred): generate a secure token, store it in Redis with TTL, email a link to the user.
    - Key: `pwdreset:<token>` → value: user id; TTL default 15 min (`RESET_TOKEN_TTL_SECONDS`).
    - Link built from `WEB_URL` (or `APP_URL`) → `/reset-password?token=<token>`.
    - Backend verifies token via Redis, updates password, and deletes the key.
  - Legacy fallback: DB `hash` on `User` still supported in `AuthService.resetPassword` for backward compatibility.
  - Reference: `src/auth/auth.service.ts` and `src/http/mail/mail.service.ts`.

## Developer workflows
- Run with Docker Compose (recommended):
  - Backend+DB: `docker-compose up api db` (API on http://localhost:8080, Swagger at `/docs`)
  - Frontend only: `docker-compose up frontend` (http://localhost:3000)
  - Full stack: `docker-compose up`
- Local backend (without Docker):
  - `cd back-tiraduvidas && npm install && npm run start:dev`
  - TypeORM: `npm run migration:run` | `migration:generate -n <Name>` | `migration:revert`
  - Tests: `npm test` | `npm run test:e2e` | coverage `npm run test:cov`
  - Debug tips: check Redis keys `pwdreset:*` and verify emails via Resend logs.
  - Required env: DB vars, `JWT_SECRET`, `RESEND_API_KEY`, `MAIL_FROM`, `WEB_URL` (or `APP_URL`), `REDIS_URL`, optional `RESET_TOKEN_TTL_SECONDS` (default 900).

## Conventions and patterns
- Controller/Service/Repository per feature folder under `src/http/<feature>`.
- DTOs live under `src/**/dto`; enums under `src/**/enums`.
- Email logging schema (optional): use `SaveEmailDto` with `template` and `additionalInformation` JSON string (e.g., `{ token, was_used, usage_attempts }`).
- Redis wrapper: `RedisService` exposes `set(key, value, ttlSec?)`, `get(key)`, `del(key)`.
- Error semantics: `HttpException` with structured payloads (e.g., `{ errors: { email: 'emailNotExists' } }`) are common.

## Key files to study
- Auth
  - `src/auth/auth.service.ts`: login, registration email, forgot/reset using Redis tokens; legacy hash fallback.
  - `src/auth/auth.module.ts`: DI wiring for Auth, Mail, and Redis.
- Mail
  - `src/http/mail/mail.service.ts`: Resend integration and optional DB logging.
  - `src/http/mail/dto/{mail-data.dto.ts,save-email.dto.ts}` and repository.
- Infra
  - `src/config/redis.ts`: Redis service using ioredis.
  - `src/database/migrations/**`: schema evolution.

## Implementation tips
- Prefer the Redis token reset flow; keep the DB-hash path intact until removed across clients.
- When sending emails, build links from `WEB_URL` first, then `APP_URL`, defaulting to `http://localhost:3000`.
- For email logging, serialize `additionalInformation` via `JSON.stringify` and mutate with care (`JSON.parse`/`JSON.stringify`).
- Avoid introducing new modules where a service exists (e.g., reuse `src/config/redis.ts`).

If anything here diverges from reality in your local environment (e.g., different env vars, ports, or DTO shapes), point it out so we can adjust this guide quickly.
