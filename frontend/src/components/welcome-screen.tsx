"use client"

import { Button } from "@/components/ui/button"

interface WelcomeScreenProps {
  onGetStarted: () => void
}

export default function WelcomeScreen({ onGetStarted }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen bg-accent text-accent-foreground flex flex-col items-center justify-between p-6 relative overflow-hidden">
      {/* Status Bar */}
      <div className="w-full flex justify-between items-center">
        <span className="text-sm font-medium">9:41</span>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4">
            <svg viewBox="0 0 24 24" className="fill-current">
              <path d="M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21ZM12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19Z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Logo */}
      <div className="absolute top-6 left-6 flex items-center gap-2">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <span className="text-primary-foreground font-bold">E</span>
        </div>
        <span className="text-xl font-semibold">Edulite</span>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center text-center max-w-md mx-auto">
        {/* Mascot */}
        <div className="w-64 h-64 bg-accent-foreground/10 rounded-full mb-8 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-48 h-48 bg-accent-foreground/20 rounded-t-[100px] relative">
              {/* Eyes */}
              <div className="absolute top-1/2 left-1/4 w-8 h-8 bg-background rounded-full"></div>
              <div className="absolute top-1/2 right-1/4 w-8 h-8 bg-background rounded-full"></div>
              {/* Cheeks */}
              <div className="absolute bottom-8 left-8 w-6 h-6 bg-secondary/50 rounded-full"></div>
              <div className="absolute bottom-8 right-8 w-6 h-6 bg-secondary/50 rounded-full"></div>
              {/* Mouth */}
              <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-16 h-8 bg-background rounded-b-full"></div>
            </div>
          </div>
        </div>

        <h1 className="text-4xl font-bold mb-4 leading-tight">Let&apos;s learn with lots of fun!</h1>
        <p className="text-lg mb-12 text-accent-foreground/80">Learning with us will be fun and make you happy.</p>
      </div>

      {/* Button */}
      <Button
        className="w-full max-w-md h-14 text-lg bg-background text-foreground hover:bg-background/90"
        onClick={onGetStarted}
      >
        Get Started
      </Button>
    </div>
  )
}

