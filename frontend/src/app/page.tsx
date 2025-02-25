

import AppView from "@/components/app-view";

import Navigation from "@/components/navigation";
export default function Home() {
  return (
    <div className="w-full max-w-md mx-auto h-screen overflow-hidden">
      <main className="">
      <AppView />
        {/* <MainURLInput />
        <ContentGallery /> */}
        <Navigation />
      </main>
    </div>
  );
}
