import type { Note } from "@/types";

export default function TabBar({ openTabs }: { openTabs: Note[] }) {
  return (
    <div className="h-10 border-b border-border bg-surface flex items-center">
      {/* app label — same width as sidebar */}
      <div className="w-48 shrink-0 h-full flex items-center px-4 border-r border-border text-xs text-muted">
        anon-notepad
      </div>

      {openTabs.map((tab) => (
        <div
          key={tab.id}
          className="h-full flex items-center px-4 border-r border-border text-xs text-muted"
        >
          {tab.title}
        </div>
      ))}
    </div>
  );
}
