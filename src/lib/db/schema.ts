import { pgEnum, pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { FlexType } from '../types/Flex';

export const flexTable = pgTable('flex', {
	// id: uuid('id').primaryKey(),
	type: pgEnum('type', [FlexType.Class, FlexType.Featured])('type').notNull(),
	title: text('title').notNull(),
	dept: text('dept').notNull(),
	room: text('room').notNull(),
	teacher: text('teacher').notNull(),
	seats: text('seats').notNull(),
	students: text('students').notNull()
});

export const testTable = pgTable('test', {
	id: uuid('id').defaultRandom().primaryKey(),
	name: text('name').notNull()
});
