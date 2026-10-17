import { db } from "@/db";
import { anonymousUsers } from "@/db/schema";

// POST -- CREATE ANONYMOUS USER
export async function POST() {
  const result = await db.insert(anonymousUsers).values({}).returning();
  const user = result[0];

  if (!user) {
    return Response.json({ message: "Failed to create user" }, { status: 500 });
  }

  return Response.json({ id: user.id }, { status: 201 });
}
