import TabBar from "@/components/TabBar";
import NotesContainer from "@/components/NotesContainer";
import AnonymousUserProvider from "@/components/AnonymousUserProvider";

export default function Home() {
  return (
    <main className="flex flex-col h-screen">
      {/* invoke function and create anonymousUserId for user */}
      <AnonymousUserProvider>
        {" "}
        {/* Main container -- vertical stack column direction -- contains all contents */}
        {/* Tabs */}
        <TabBar />
        {/* invoke and render NotesContainer */}
        {/* NotesContainer now holds Sidebar, Editor, and Toolbar */}
        <NotesContainer />
      </AnonymousUserProvider>
    </main>
  );
}
