import { db } from "@/db";
import { notesTable } from "@/db/schema";
import { eq } from "drizzle-orm";

// GET -- retrieve user's notes
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return Response.json({ message: "userId is required" }, { status: 400 });
  }

  const notes = await db
    .select()
    .from(notesTable)
    .where(eq(notesTable.anonymousUserId, userId));

  return Response.json(notes, { status: 200 });
}

// POST -- create a note for the user
export async function POST(request: Request) {
  const body = await request.json();
  const { title, content, userId } = body;

  if (!title || !userId) {
    return Response.json(
      { message: "title and userId are required" },
      { status: 400 }
    );
  }

  // insert + return inserted value after
  const result = await db
    .insert(notesTable)
    .values({ anonymousUserId: userId, title: title, content: content })
    .returning();

  const note = result[0];

  if (!note) {
    return Response.json({ message: "Failed to create note" }, { status: 500 });
  }

  return Response.json(note, { status: 201 });
}
