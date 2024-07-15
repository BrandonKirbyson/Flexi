import { defineConfig } from 'drizzle-kit';
import { config } from 'dotenv';
config();

export default defineConfig({
	schema: './src/lib/db/schema.ts',
	out: './supabase/migrations',
	dialect: 'postgresql', // 'postgresql' | 'mysql' | 'sqlite'
	dbCredentials: {
		// host: process.env.DB_HOST,
		// user: process.env.DB_USER,
		// password: process.env.DB_PASSWORD,
		// database: process.env.DB_NAME
		url: process.env.DATABASE_URL!
	}
});
