import { db } from "@/db";
import { notesTable } from "@/db/schema";
import { eq } from "drizzle-orm";

// get id from path params
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params; // /api/notes/abc-123
  const body = await request.json();
  const { title, content } = body;

  // return when no id and title provided
  if (!id || !title) {
    return Response.json(
      { message: "id and title are required " },
      { status: 400 }
    );
  }

  // UPDATE notes
  // SET title = 'title', content = 'content'
  // WHERE id = 'id'
  // RETURNING *;
  const result = await db
    .update(notesTable)
    .set({ title: title, content: content })
    .where(eq(notesTable.id, id))
    .returning();

  // grab first and only item from result
  const note = result[0];

  // return when note is not found, matched by id
  if (!note) {
    return Response.json({ message: "Note not found" }, { status: 404 });
  }

  return Response.json(note, { status: 200 });
}
