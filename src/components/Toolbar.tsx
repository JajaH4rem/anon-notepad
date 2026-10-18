"use client";
import { useState } from "react";

export default function Toolbar({
  onNoteCreatedAction,
}: {
  onNoteCreatedAction: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="h-10 border-b relative">
      <button
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {" "}
        File
      </button>

      {isOpen && (
        <div className="absolute top-10 left-0 border bg-black">
          <button
            onClick={() => {
              const userId = localStorage.getItem("anonymousUserId");

              if (!userId) {
                return;
              }

              (async () => {
                await fetch("/api/notes", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    title: "Untitled",
                    content: "",
                    userId: userId,
                  }),
                });
                setIsOpen(false);
                onNoteCreatedAction();
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
