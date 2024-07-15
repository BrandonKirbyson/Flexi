import { DATABASE_URL_DEV, DATABASE_URL_PROD } from '$env/static/private';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const isDev = import.meta.env.DEV;

const client = postgres(isDev ? DATABASE_URL_DEV : DATABASE_URL_PROD);
export const db = drizzle(client, { schema });
