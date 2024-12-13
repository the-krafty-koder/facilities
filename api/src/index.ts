import { Hono } from 'hono';
import getFacilities from './controllers.ts/getFacilities';
import createFacility from './controllers.ts/createFacility';
import updateFacility from './controllers.ts/updateFacility';
import deleteFacility from './controllers.ts/deleteFacility';
import uploadFile from './controllers.ts/uploadFile';
import { cors } from 'hono/cors';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';

export type Bindings = {
	DATABASE_URL: string;
	UPLOAD_BUCKET: R2Bucket;
	BUCKET_URL: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.use(
	cors({
		origin: '*', // Allow all origins, replace with specific origin if needed
		allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow specific methods
		allowHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
	})
);

const validationSchema = z.object({
	name: z.string(),
	type: z.string(),
	streetAddress: z.string(),
	city: z.string(),
	state: z.string(),
	zipCode: z.string(),
	phoneNumber: z.string(),
	siteLeader: z.string().optional(),
	imageUrl: z.string().optional(),
});

app.get('/facilities', getFacilities);
app.post('/facilities', zValidator('json', validationSchema), createFacility);
app.put('/facilities/:id', zValidator('json', validationSchema.partial()), updateFacility);
app.delete('/facilities/:id', deleteFacility);
app.post('/upload', uploadFile);

export default app;
