import { pgTable, text, jsonb, timestamp } from "drizzle-orm/pg-core";
export interface FormSnapshot {
	values: Record<string, string | boolean>;
	selected: string[];
	open: string[];
}
export const notebook = pgTable("notebook", {
	id: text().primaryKey(),
	title: text().notNull(),
	note: text().notNull().default(""),
	route: text().notNull(),
	snapshot: jsonb().$type<FormSnapshot>().notNull(),
	createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
	deletedAt: timestamp({ withTimezone: true }),
});
