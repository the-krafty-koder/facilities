import { facilities } from '../db/schema';
import { Context } from 'hono';
import getDb from '../db/getDb';

const getFacilities = async (c: Context) => {
	const db = getDb(c.env.DATABASE_URL);
	const allFacilities = await db.select().from(facilities);

	return c.json(allFacilities);
};

export default getFacilities;
