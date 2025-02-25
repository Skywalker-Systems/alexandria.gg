"use client"

// import ContentGallery from "@/components/content-gallery";
// import { MainURLInput } from "@/components/main-input";
import WelcomeScreen from "@/components/welcome-screen";

export default function Home() {
  return (
    <div className="w-full max-w-md mx-auto h-screen overflow-hidden">
      <main className="">
        <WelcomeScreen onGetStarted={() => {}} />
        {/* <MainURLInput />
        <ContentGallery /> */}
      </main>
    </div>
  );
}
