import { Injectable, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';

/**
 * Lightweight Redis service using ioredis.
 *
 * Env vars:
 * - REDIS_URL (e.g., redis://localhost:6379)
 */
@Injectable()
export class RedisService implements OnModuleDestroy {
	private client: any;

	constructor() {
		const url = 'redis://redis:6379';
		this.client = new Redis(url);

		this.client.on('error', (err: any) => {
			// Consider swapping to Nest logger if available
			console.error('Redis error:', err);
		});

		this.client.on('connect', () => {
			console.log('Connected to Redis server');
		});
	}

	async set(key: string, value: string, ttlSec?: number): Promise<string> {
		try{
			if (ttlSec && ttlSec > 0) {
				await this.client.set(key, value, 'EX', ttlSec);
			} else {
				await this.client.set(key, value);
			}

			return 'ok';
		}catch(err){
			console.error('Redis set error:', err);
		}
	}

	async get(key: string) {
		return this.client.get(key);
	}

	async del(key: string) {
		await this.client.del(key);
	}

	async onModuleDestroy() {
		try {
			await this.client.quit();
		} catch (e) {
			// ignore
		}
	}
}