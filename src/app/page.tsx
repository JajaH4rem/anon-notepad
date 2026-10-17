import Editor from "@/components/Editor";
import Sidebar from "@/components/Sidebar";
import TabBar from "@/components/TabBar";
import Toolbar from "@/components/Toolbar";


export default function Home() {
  return (
    <main className="flex flex-col h-screen"> {/* Main container -- vertical stack column direction -- contains all contents */}
      {/* Tabs */}
      <TabBar />

        {/* Container for Sidebar, Toolbar, and Editor. Takes space side-by-side */}
        <div className="flex flex-1 overflow-hidden">

          {/* Sidebar -- takes left side of container */}
          <Sidebar />

          {/* Inner container for Toolbar and Editor -- right side -- stacks vertically */}
          <div className="flex flex-col flex-1">

            {/* Toolbar -- takes top portion */}
            <Toolbar />

            {/* Editor -- takes bottom portion */}
            <Editor />

        </div>
        </div>
    </main>
  );
}
