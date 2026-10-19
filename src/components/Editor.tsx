import { useEffect, useState } from "react";

export default function Editor({
  selectedNote,
  onNoteSavedAction,
}: {
  selectedNote: { id: string; title: string; content: string } | null;
  onNoteSavedAction: () => void;
}) {
  // title and content states
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  {
    /* Sync NotesContainer states with our local states */
  }
  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title);
      setContent(selectedNote.content);
    }
  }, [selectedNote]);

  {
    /* debounced auto save, 1 sec timer. calls the notes PATCH endpoint */
  }
  useEffect(() => {
    if (!selectedNote) return;
    if (title === selectedNote.title && content === selectedNote.content)
      return;

    // after 1 sec send the PATCH, with title, and content as payload
    // id is sent as path parameter
    const timer = setTimeout(async () => {
      await fetch(`/api/notes/${selectedNote.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title, content: content }),
      });

      onNoteSavedAction();
    }, 1000);
    return () => clearTimeout(timer);
  }, [title, content]);

  return (
    <div className="flex-1">
      {selectedNote ? (
        <div className="flex flex-col">
          {/* title dynamic input, default title as value */}
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          {/* content dynamic typing, default content as value */}
          <textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />
        </div>
      ) : (
        <div>
          <p>Select a note or create a new one</p>
        </div>
      )}
    </div>
  );
}
