import { Context } from 'hono';
import { Facility } from '../types';
import { facilities } from '../db/schema';
import getDb from '../db/getDb';

const createFacility = async (c: Context) => {
	const db = getDb(c.env.DATABASE_URL);

	const values = c.req.valid('json' as never);
	const facility = await db.insert(facilities).values(values).returning();
	return c.json(facility);
};

export default createFacility;
