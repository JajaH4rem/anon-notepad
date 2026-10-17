"use client";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    async function initializeSidebar() {
      const userId = localStorage.getItem("anonymousUserId");

      if (!userId) {
        return "No userId provided";
      }

      const response = await fetch(`/api/notes?userId=${userId}`);
      const data = await response.json();

      setNotes(data);
    }

    initializeSidebar();
  }, []);

  return (
    <div className="w-48 border-r">
      {notes.map((note) => (
        <div key={note.id}>{note.title}</div>
      ))}
    </div>
  );
}
