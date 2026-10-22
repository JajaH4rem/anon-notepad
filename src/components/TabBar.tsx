export default function TabBar() {
  return (
    <div className="h-10 border-b border-border bg-surface flex items-center">
      {/* app label — same width as sidebar */}
      <div className="w-48 shrink-0 h-full flex items-center px-4 border-r border-border text-xs text-muted">
        anon-notepad
      </div>

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
