import { Context } from 'hono';
import { facilities } from '../db/schema';
import { eq } from 'drizzle-orm';
import getDb from '../db/getDb';

const deleteFacility = async (c: Context) => {
	const db = getDb(c.env.DATABASE_URL);
	const id = Number(c.req.param('id'));

	await db.delete(facilities).where(eq(facilities.id, id));
	return c.json({});
};

export default deleteFacility;
