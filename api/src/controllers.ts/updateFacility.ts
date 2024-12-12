import { Context } from 'hono';
import { Facility } from '../types';
import { facilities } from '../db/schema';
import { eq } from 'drizzle-orm';
import getDb from '../db/getDb';

const updateFacility = async (c: Context) => {
	const db = getDb(c.env.DATABASE_URL);
	const id = Number(c.req.param('id'));

	const values = c.req.valid('json' as never);
	const facility = await db.update(facilities).set(values).where(eq(facilities.id, id)).returning();

	return c.json(facility);
};

export default updateFacility;
