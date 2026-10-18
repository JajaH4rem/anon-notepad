import { pgTable, uuid, timestamp, text } from "drizzle-orm/pg-core";

// creates anonymousUsers pgTable - no login required
// with fields:
// id
// created_at
export const anonymousUsers = pgTable("anonymous_users", {
  id: uuid("id").primaryKey().defaultRandom(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

//creates notesTable pgTable - one note belongs to one user
// with fields
// id
// title
// content
// created_at
// updated_at
export const notesTable = pgTable("notes", {
  id: uuid("id").primaryKey().defaultRandom(),
  anonymousUserId: uuid("anonymous_user_id")
    .notNull()
    .references(() => anonymousUsers.id),
  title: text("title").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
