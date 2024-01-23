import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const projects = sqliteTable("projects", {
  id: integer("id").primaryKey(),
  title: text("title"),
  launch: integer("launch", { mode: "timestamp" }),
});
