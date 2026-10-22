"use client";

import { useEffect, useState } from "react";
import type { Note } from "@/types";
import FolderIcon from "./icons/FolderIcon";

// sidebar accepts notes object with 3 string fields
// id, title, and content
export default function Sidebar({
  notes,
  onSelectedAction,
  onNoteDeletedAction,
  onNoteRenamedAction,
}: {
  notes: Note[];
  onSelectedAction: (note: Note) => void;
  onNoteDeletedAction: (deletedId: string) => void;
  onNoteRenamedAction: (renamedId: string, renamedTitle: string) => void;
}) {
  const [renameValue, setRenameValue] = useState<string>("");
  const [openNoteId, setOpenNoteId] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [modal, setModal] = useState<{
    type: "rename" | "delete";
    noteId: string;
  } | null>(null);

  useEffect(() => {
    function getId() {
      setUserId(localStorage.getItem("anonymousUserId"));
    }
    getId();
  }, []);

  async function onDelete(id: string) {
    await fetch(`/api/notes/${id}`, {
      method: "DELETE",
    });
    setOpenNoteId(null);
  }

  async function onRename(id: string, content: string) {
    await fetch(`/api/notes/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: renameValue,
        content: content,
      }),
    });
  }

  return (
    <div className="w-48 border-r border-border bg-surface flex flex-col">
      <div className="h-10 px-4 flex items-center gap-2 text-sm border-border">
        {/* render folder icon beside: user/anon-notes */}
        <FolderIcon />
        {userId ? `${userId.slice(0, 6)} / anon-notes` : "anon-notes"}
      </div>
      {openNoteId && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setOpenNoteId(null)}
        />
      )}
      <div className="ml-3 border-l border-subtle">
        {notes.map((note) => (
          <div
            key={note.id}
            className="flex items-center justify-between relative px-2 py-1 hover:bg-background group"
          >
            <div
              onClick={() => onSelectedAction(note)}
              className="flex-1 truncate text-sm text-foreground cursor-pointer"
            >
              {note.title}
            </div>
            <button
              onClick={() => setOpenNoteId(note.id)}
              className="text-muted hover:text-foreground opacity-0 group-hover:opacity-100 px-1 text-xs"
            >
              •••
            </button>
            {openNoteId === note.id && (
              <div className="absolute top-full right-0 z-10 border border-border bg-surface shadow-sm min-w-24">
                <button
                  onClick={() => {
                    setOpenNoteId(null);
                    setModal({ type: "delete", noteId: note.id });
                  }}
                  className="w-full text-left px-3 py-1.5 text-sm text-foreground hover:bg-background"
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    setOpenNoteId(null);
                    setModal({ type: "rename", noteId: note.id });
                  }}
                  className="w-full text-left px-3 py-1.5 text-sm text-foreground hover:bg-background"
                >
                  Rename
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {modal && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={() => setModal(null)}
          />
          <div className="relative z-20 bg-surface border border-border p-4 w-64 shadow-md">
            <p className="text-sm text-heading font-medium mb-3">
              {modal.type === "delete"
                ? "Delete this note?"
                : "Rename this note?"}
            </p>

            {modal.type === "rename" && (
              <input
                value={renameValue}
                onChange={(e) => setRenameValue(e.target.value)}
                className="w-full border border-border bg-background text-foreground text-sm px-2 py-1 mb-3 outline-none focus:border-muted"
              />
            )}

            {modal.type === "delete" && (
              <p className="text-xs text-muted mb-3">This cannot be undone.</p>
            )}

            <div className="flex gap-2 justify-end">
              <button
                onClick={() => {
                  setModal(null);
                  setOpenNoteId(null);
                }}
                className="px-3 py-1 text-sm text-muted hover:text-foreground border border-border"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  if (modal.type === "delete") {
                    await onDelete(modal.noteId);
                    onNoteDeletedAction(modal.noteId);
                  }
                  if (modal.type === "rename") {
                    const noOverwriteContent = notes.find(
                      (note) => note.id === modal.noteId
                    );
                    await onRename(
                      modal.noteId,
                      noOverwriteContent?.content ?? ""
                    );
                    onNoteRenamedAction(modal.noteId, renameValue);
                    setOpenNoteId(null);
                  }
                  setModal(null);
                }}
                className="px-3 py-1 text-sm text-heading hover:text-foreground border border-border"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
