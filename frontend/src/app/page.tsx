

import AppView from "@/components/app-view";
// import ContentGallery from "@/components/content-gallery";
// import { MainURLInput } from "@/components/main-input";
import WelcomeScreen from "@/components/welcome-screen";

export default function Home() {
  return (
    <div className="w-full max-w-md mx-auto h-screen overflow-hidden">
      <main className="">
      <AppView />
        {/* <MainURLInput />
        <ContentGallery /> */}
      </main>
    </div>
  );
}
