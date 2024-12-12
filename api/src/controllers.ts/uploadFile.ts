import { Context } from 'hono';

const uploadFile = async (c: Context) => {
	const body = await c.req.parseBody();
	const file = body['file'];

	if (file && file instanceof File) {
		await c.env.UPLOAD_BUCKET.put(file.name, file);
		return c.json({ filePath: `${c.env.BUCKET_URL}/${file.name}` });
	}
};

export default uploadFile;
