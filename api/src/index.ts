import { Hono } from 'hono';
import getFacilities from './controllers.ts/getFacilities';
import createFacility from './controllers.ts/createFacility';
import updateFacility from './controllers.ts/updateFacility';
import deleteFacility from './controllers.ts/deleteFacility';
import uploadFile from './controllers.ts/uploadFile';

export type Bindings = {
	DATABASE_URL: string;
	UPLOAD_BUCKET: R2Bucket;
	BUCKET_URL: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get('/facilities', getFacilities);
app.post('/facilities', createFacility);
app.put('/facilities/:id', updateFacility);
app.delete('/facilities/:id', deleteFacility);
app.post('/upload', uploadFile);

export default app;
