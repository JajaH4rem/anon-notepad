import { pgTable, uuid, timestamp, text } from "drizzle-orm/pg-core";

export const anonymousUsers = pgTable("anonymous_users", {
  id: uuid("id").primaryKey().defaultRandom(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const notesTable = pgTable("notes", {
  id: uuid("id").primaryKey().defaultRandom(),
  anonymousUserId: uuid("anonymous_user_id").notNull().references(() => anonymousUsers.id),
  title: text("title").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow()
})
