import NotesContainer from "@/components/NotesContainer";
import AnonymousUserProvider from "@/components/AnonymousUserProvider";

export default function Home() {
  return (
    <main>
      {/* invoke function and create anonymousUserId for user */}
      <AnonymousUserProvider>
        {" "}
        {/* Main container -- vertical stack column direction -- contains all contents */}
        {/* invoke and render NotesContainer */}
        {/* NotesContainer now holds Sidebar, Editor, TabBar and Toolbar */}
        <NotesContainer />
      </AnonymousUserProvider>
    </main>
  );
}
