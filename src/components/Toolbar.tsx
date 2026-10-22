"use client";
import { useState } from "react";
import type { Note } from "@/types";

export default function Toolbar({
  onNoteCreatedAction,
}: {
  onNoteCreatedAction: (note: Note) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="h-10 border-b border-border bg-surface flex items-center px-2 relative">
      {/* flip isOpen state on and off */}
      {/* used as condition for conditional render */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-sm text-muted hover:text-foreground px-2 py-1"
      >
        File
      </button>
      {isOpen && (
        <div className="fixed inset-0" onClick={() => setIsOpen(false)} />
      )}
      {/* Conditional render for File button dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 border border-border bg-surface shadow-sm z-10 min-w-32">
          <button
            className="w-full text-left px-3 py-1.5 text-sm text-foreground hover:bg-background"
            onClick={() => {
              // fetch userId and POST new note with defaults
              const userId = localStorage.getItem("anonymousUserId");

              if (!userId) {
                return;
              }

              // IIFE for notes POST
              (async () => {
                const response = await fetch("/api/notes", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    title: "Untitled",
                    content: "",
                    userId: userId,
                  }),
                });
                const note = (await response.json()) as Note;
                setIsOpen(false);
                onNoteCreatedAction(note);
              })();
            }}
          >
            New Note
          </button>
        </div>
      )}
    </div>
  );
}
