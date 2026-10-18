export default function Sidebar({
  notes,
}: {
  notes: { id: string; title: string; content: string }[];
}) {
  return (
    <div className="w-48 border-r">
      {notes.map((note) => (
        <div key={note.id}>{note.title}</div>
      ))}
    </div>
  );
}
