import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  url: process.env.DATABASE_URL,
  type: process.env.DATABASE_TYPE,
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  password: 'tira_duvidas_back' || process.env.DATABASE_PASSWORD,
  name: process.env.DATABASE_NAME,
  username: 'tira_duvidas_back' || process.env.DATABASE_USERNAME,
  synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
  maxConnections: parseInt(process.env.DATABASE_MAX_CONNECTIONS, 10) || 100,
  sslEnabled: process.env.DATABASE_SSL_ENABLED === 'true',
  rejectUnauthorized: process.env.DATABASE_REJECT_UNAUTHORIZED === 'true',
  entities: ['dist/**/entities/*.entity.{ts,js}'],
  migrations: ['dist/database/migrations/**/*{.ts,.js}'],
}));
