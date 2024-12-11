import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { Context } from 'hono';
import { Facility } from '../types';
import { facilities } from '../db/schema';
import { eq } from 'drizzle-orm';

const updateFacility = async (c: Context) => {
	const sql = neon(c.env.DATABASE_URL);
	const db = drizzle(sql);

	const id = Number(c.req.param('id'));

	const values = await c.req.json<Facility>();
	const facility = await db.update(facilities).set(values).where(eq(facilities.id, id)).returning();
	return c.json(facility);
};

export default updateFacility;
