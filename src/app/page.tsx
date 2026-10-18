import TabBar from "@/components/TabBar";
import NotesContainer from "@/components/NotesContainer";
import AnonymousUserProvider from "@/components/AnonymousUserProvider";

export default function Home() {
  return (
    <main className="flex flex-col h-screen">
      <AnonymousUserProvider>
        {" "}
        {/* Main container -- vertical stack column direction -- contains all contents */}
        {/* Tabs */}
        <TabBar />
        <NotesContainer />
      </AnonymousUserProvider>
    </main>
  );
}
