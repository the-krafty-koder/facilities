import { pgTable, serial, text, doublePrecision } from 'drizzle-orm/pg-core';

export const facilities = pgTable('facilities', {
	id: serial('id').primaryKey(),
	name: text('name').notNull(),
	streetAddress: text('street_address').notNull(),
	city: text('city').notNull(),
	state: text('state').notNull(),
	zipCode: text('zip_code').notNull(),
	phoneNumber: text('phone_number').notNull(),
	siteLeader: text('site_leader'),
	imageUrl: text('image_url'),
});
