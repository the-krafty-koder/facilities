import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { Context } from 'hono';
import { Facility } from '../types';
import { facilities } from '../db/schema';

const createFacility = async (c: Context) => {
	const sql = neon(c.env.DATABASE_URL);
	const db = drizzle(sql);

	const value = await c.req.json<Facility>();
	const facility = await db.insert(facilities).values(value).returning();
	return c.json(facility);
};

export default createFacility;
