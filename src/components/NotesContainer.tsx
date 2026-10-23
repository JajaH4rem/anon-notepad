"use client";

import Editor from "@/components/Editor";
import Sidebar from "@/components/Sidebar";
import Toolbar from "@/components/Toolbar";
import type { Note } from "@/types";

import { useEffect, useState } from "react";

export default function NotesContainer() {
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [openTabs, setOpenTabs] = useState<Note[]>([]);

  // load tabs from localStorage on page load or mount
  // use inner function to avoid react-hooks/set-state-in-effect ESLint warning
  useEffect(() => {
    function getLocalTabs() {
      const userId = localStorage.getItem("anonymousUserId");
      if (!userId) return;
      const saved = localStorage.getItem(`openTabs:${userId}`);
      if (!saved) return;
      const parsed: Note[] = JSON.parse(saved);
      setOpenTabs(parsed);
    }
    getLocalTabs();
  }, []);

  // invokable function to fetch notes
  async function fetchNotes() {
    const userId = localStorage.getItem("anonymousUserId");
    if (!userId) return;
    const response = await fetch(`/api/notes?userId=${userId}`);
    const data = await response.json();
    setNotes(data);
  }

  // helper for adding openTabs
  function openTab(note: Note) {
    setOpenTabs((previous) => {
      if (previous.find((tab) => tab.id === note.id)) return previous;
      return [...previous, note];
    });
  }

  // save openTabs to localStorage whenever it changes
  useEffect(() => {
    const userId = localStorage.getItem("anonymousUserId");
    if (!userId) return;
    localStorage.setItem(`openTabs:${userId}`, JSON.stringify(openTabs));
  }, [openTabs]);

  // initial render fetch via invoking fetchNotes
  useEffect(() => {
    async function loadNotes() {
      const userId = localStorage.getItem("anonymousUserId");
      if (!userId) return;
      const response = await fetch(`/api/notes?userId=${userId}`);
      const data = await response.json();
      setNotes(data);
    }
    loadNotes();
  }, []);

  return (
    /* Container for Sidebar, Toolbar, and Editor. Takes space side-by-side */
    <div className="flex flex-1 overflow-hidden">
      {/* Sidebar -- takes left side of container */}
      <Sidebar
        notes={notes}
        onSelectedAction={setSelectedNote}
        onNoteDeletedAction={(deletedId: string) => {
          fetchNotes();
          if (selectedNote?.id === deletedId) setSelectedNote(null);
        }}
        onNoteRenamedAction={(renamedId: string, newTitle: string) => {
          if (renamedId === selectedNote?.id) {
            setSelectedNote({ ...selectedNote, title: newTitle });
          }
          fetchNotes();
        }}
      />

      {/* Inner container for Toolbar and Editor -- right side -- stacks vertically */}
      <div className="flex flex-col flex-1">
        {/* Toolbar -- takes top portion */}
        <Toolbar
          onNoteCreatedAction={(note: Note) => {
            fetchNotes();
            setSelectedNote(note);
          }}
        />

        {/* Editor -- takes bottom portion */}
        <Editor selectedNote={selectedNote} onNoteSavedAction={fetchNotes} />
      </div>
    </div>
  );
}
