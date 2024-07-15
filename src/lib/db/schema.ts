import { integer, pgEnum, pgTable, text, uuid, serial, timestamp, varchar, pgSchema } from 'drizzle-orm/pg-core';
import { FlexDept, FlexType } from '../types/Flex';
import type { InferSelectModel } from 'drizzle-orm';
const authSchema = pgSchema('auth');

const users = authSchema.table('users', {
	id: uuid('id').primaryKey(),
});

export const accounts = pgTable('accounts', {
	id: serial('id').primaryKey(),
	fullName: text('full_name').notNull(),
	user_id: uuid('user_id').references(() => users.id).notNull()
});

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

const baseUser = {
	id: uuid("id").notNull().primaryKey().references(() => users.id, {onDelete: 'cascade'}),
	firstName: varchar("first_name", { length: 128 }).notNull(),
	lastName: varchar("last_name", { length: 128 }).notNull(),
};

export const students = pgTable("students", {
	...baseUser,
	gradYear: integer("grad_year").notNull(),
});

export type Student = InferSelectModel<typeof students>;

// export const users = pgTable("users", {
// 	...baseUser,
// 	username: varchar("username", { length: 128 }).notNull(),
// 	bio: varchar("bio", { length: 255 }),
// });