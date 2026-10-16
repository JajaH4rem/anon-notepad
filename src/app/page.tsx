export default function Home() {
  return (
    <main className="flex flex-col h-screen"> {/* Main container -- vertical stack column direction -- contains all contents */}
      {/* Tabs */}
      <div className="h-10 border-b">Tabs</div>

      {/* Container for Sidebar, Toolbar, and Editor. Takes space side-by-side */}
      <div className="flex flex-1 overflow-hidden">

        {/* Sidebar -- takes left side of container */}
        <div className="w-48 border-r">Sidebar</div>

        {/* Inner container for Toolbar and Editor -- right side -- stacks vertically */}
        <div className="flex flex-col flex-1">

          {/* Toolbar -- takes top portion */}
          <div className="h-10 border-b">Toolbar</div>

          {/* Editor -- takes bottom portion */}
          <div className="flex-1">Editor</div>
        </div>
      </div>

    </main>
  );
}
