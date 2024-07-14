import { integer, pgTable, text, uuid } from 'drizzle-orm/pg-core';

export const flexTable = pgTable('flex', {
	id: uuid('id').defaultRandom().primaryKey(),
	// type: pgEnum('type', [FlexType.Class, FlexType.Featured])('type').notNull(),
	type: text('type').notNull(),
	title: text('title').notNull(),
	dept: text('dept').notNull(),
	room: text('room').notNull(),
	teacherFirstName: text('teacherFirstName').notNull(),
	teacherLastName: text('teacherLastName').notNull(),
	seats: integer('seats').notNull()
});
