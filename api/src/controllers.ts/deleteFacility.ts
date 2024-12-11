import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { Context } from 'hono';
import { facilities } from '../db/schema';
import { eq } from 'drizzle-orm';

const deleteFacility = async (c: Context) => {
	const sql = neon(c.env.DATABASE_URL);
	const db = drizzle(sql);

	const id = Number(c.req.param('id'));

	await db.delete(facilities).where(eq(facilities.id, id));
	return c.json({});
};

export default deleteFacility;
