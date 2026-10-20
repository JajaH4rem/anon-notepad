"use client";

import { useState } from "react";

// sidebar accepts notes object with 3 string fields
// id, title, and content
export default function Sidebar({
  notes,
  onSelectedAction,
}: {
  notes: { id: string; title: string; content: string }[];
  onSelectedAction: (note: {
    id: string;
    title: string;
    content: string;
  }) => void;
}) {
  const [openNoteId, setOpenNoteId] = useState<string | null>(null);

  async function onDelete(id: string) {
    await fetch(`/api/notes/${openNoteId}`, {
      method: "DELETE",
    });
    setOpenNoteId(null);
  }

  return (
    <div className="w-48 border-r">
      {openNoteId && (
        <div className="fixed inset-0" onClick={() => setOpenNoteId(null)} />
      )}
      {notes.map((note) => (
        <div key={note.id} className="flex justify-between relative">
          <div onClick={() => onSelectedAction(note)}> {note.title} </div>
          <button onClick={() => setOpenNoteId(note.id)}>...</button>
          {openNoteId === note.id && (
            <div className="absolute top-10 right-0 border bg-black">
              <button onClick={() => onDelete(note.id)}>Delete</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
