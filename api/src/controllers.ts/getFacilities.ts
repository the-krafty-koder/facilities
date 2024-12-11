import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { facilities } from '../db/schema';
import { Context } from 'hono';

const getFacilities = async (c: Context) => {
	const sql = neon(c.env.DATABASE_URL);
	const db = drizzle(sql);

	const allFacilities = await db.select().from(facilities);
	return c.json(allFacilities);
};

export default getFacilities;
