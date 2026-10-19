"use client";

import Editor from "@/components/Editor";
import Sidebar from "@/components/Sidebar";
import Toolbar from "@/components/Toolbar";

import { useEffect, useState } from "react";

export default function NotesContainer() {
  const [selectedNote, setSelectedNote] = useState<{
    id: string;
    title: string;
    content: string;
  } | null>(null);
  const [notes, setNotes] = useState([]);

  // invokable function to fetch notes
  async function fetchNotes() {
    const userId = localStorage.getItem("anonymousUserId");
    if (!userId) return;
    const response = await fetch(`/api/notes?userId=${userId}`);
    const data = await response.json();
    setNotes(data);
  }

  // initial render fetch via invoking fetchNotes
  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    /* Container for Sidebar, Toolbar, and Editor. Takes space side-by-side */
    <div className="flex flex-1 overflow-hidden">
      {/* Sidebar -- takes left side of container */}
      <Sidebar notes={notes} onSelectedAction={setSelectedNote} />

      {/* Inner container for Toolbar and Editor -- right side -- stacks vertically */}
      <div className="flex flex-col flex-1">
        {/* Toolbar -- takes top portion */}
        <Toolbar onNoteCreatedAction={fetchNotes} />

        {/* Editor -- takes bottom portion */}
        <Editor selectedNote={selectedNote} onNoteSavedAction={fetchNotes} />
      </div>
    </div>
  );
}
