"use client"

import { useState } from "react"
import WelcomeScreen from "@/components/welcome-screen"
import DashboardScreen from "@/components/dashboard-screen"
import CourseDetailScreen from "@/components/course-detailsScreen"

type Screen = "welcome" | "dashboard" | "course"

export default function AppView() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("welcome")

  const handleNavigate = (screen: Screen) => {
    setCurrentScreen(screen)
  }

  return (
    <div className="w-full max-w-md mx-auto h-screen overflow-hidden">
      {currentScreen === "welcome" && <WelcomeScreen onGetStarted={() => handleNavigate("dashboard")} />}
      {currentScreen === "dashboard" && <DashboardScreen onCourseClick={() => handleNavigate("course")} />}
      {currentScreen === "course" && <CourseDetailScreen onBack={() => handleNavigate("dashboard")} />}
    </div>
  )
}

