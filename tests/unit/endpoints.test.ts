import { ENDPOINTS } from '@/lib/util/endpoints';
import { describe, expect, it } from 'vitest';

describe('Endpoints', () => {
	it('Valid endpoint string', () => {
		const fn = (obj: object) => {
			for (const k in obj) {
				if (typeof obj[k as keyof typeof obj] === 'object') {
					fn(obj[k as keyof typeof obj]);
				} else {
					const key = k as keyof typeof obj;
					try {
						expect(obj[key]).not.toMatch(/\/$/);
						expect(obj[key]).not.toMatch(/\/\//);
						expect(obj[key]).toMatch(/^\//);
						expect(obj[key]).toMatch(/\/[a-zA-Z\/]+$/);
					} catch {
						throw new Error(`Test failed at api endpoint '${obj[key] as string}'`);
					}
				}
			}
		};

		fn(ENDPOINTS);
	});
});
