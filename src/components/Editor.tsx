import { useEffect, useState } from "react";

export default function Editor({
  selectedNote,
}: {
  selectedNote: { id: string; title: string; content: string } | null;
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title);
      setContent(selectedNote.content);
    }
  }, [selectedNote]);

  return (
    <div className="flex-1">
      {selectedNote ? (
        <div className="flex flex-col">
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
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
