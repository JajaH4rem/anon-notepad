export default function Editor({
  selectedNote,
}: {
  selectedNote: { id: string; title: string; content: string } | null;
}) {
  return (
    <div className="flex-1">
      {selectedNote ? (
        <div>
          <h1>{selectedNote.title}</h1>
          <h2>{selectedNote.content}</h2>
        </div>
      ) : (
        <div>
          <p>Select a note or create a new one</p>
        </div>
      )}
    </div>
  );
}
