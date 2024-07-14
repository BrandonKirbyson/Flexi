import { integer, pgEnum, pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { FlexDept, FlexType } from '../types/Flex';

export const flexTable = pgTable('flex', {
	id: uuid('id').defaultRandom().primaryKey(),
	type: pgEnum('type', [FlexType.Class, FlexType.Featured])('type').notNull(),
	title: text('title').notNull(),
	dept: pgEnum('dept', Object.values(FlexDept) as [string, ...string[]])('dept').notNull(),
	room: text('room').notNull(),
	teacherFirstName: text('teacherFirstName').notNull(),
	teacherLastName: text('teacherLastName').notNull(),
	seats: integer('seats').notNull()
});
