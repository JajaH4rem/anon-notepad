// sidebar accepts notes object with 3 string fields
// id, title, and content
export default function Sidebar({
  notes,
  onSelectedAction,
}: {
  notes: { id: string; title: string; content: string }[];
  onSelectedAction: (note: {
    id: string;
    title: string;
    content: string;
  }) => void;
}) {
  return (
    <div className="w-48 border-r">
      {notes.map((note) => (
        <div key={note.id} onClick={() => onSelectedAction(note)}>
          {note.title}
        </div>
      ))}
    </div>
  );
}
