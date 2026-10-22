export default function TabBar() {
  return (
    <div className="h-10 border-b border-border bg-surface flex items-center">
      {/* tab placeholders */}
      <div className="h-full flex items-center px-4 border-r border-border text-xs text-muted">
        My Note
      </div>
      <div className="h-full flex items-center px-4 border-r border-border text-xs text-muted">
        Another Note
      </div>
      <div className="h-full flex items-center px-4 border-r border-border text-xs text-muted">
        Untitled
      </div>
    </div>
  );
}
