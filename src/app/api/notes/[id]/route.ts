import { db } from "@/db";
import { notesTable } from "@/db/schema";
import { eq } from "drizzle-orm";

// PATCH a note using id [id] /id
export async function PATCH(
  // get id from path params
  request: Request,
  { params }: { params: Promise<{ id: string }> }
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

// DELETE notes. takes in notes id
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params; // /api/notes/abc-123
  // return if no id provided
  if (!id) {
    return Response.json({ message: "id is required" }, { status: 400 });
  }

  // DELETE
  // FROM notesTable
  // WHERE id = param id
  // RETURNING *;
  const result = await db
    .delete(notesTable)
    .where(eq(notesTable.id, id))
    .returning();

  // grab first and only item from result
  const note = result[0];

  // return 404 when note not found
  if (!note) {
    return Response.json({ message: "Note not found" }, { status: 404 });
  }

  return Response.json(note, { status: 200 });
}
