"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import WelcomeScreen from "@/components/welcome-screen"
import DashboardScreen from "@/components/dashboard-screen"
import { CourseData } from "./create-course-modal"

export default function AppView() {
  const [hasSeenWelcome, setHasSeenWelcome] = useState(false);
  const [courses, setCourses] = useState<CourseData[]>([]);
  const router = useRouter();

  // Load the welcome status and courses from localStorage on component mount
  useEffect(() => {
    const welcomeStatus = localStorage.getItem('hasSeenWelcome');
    if (welcomeStatus === 'true') {
      setHasSeenWelcome(true);
    }

    const storedCourses = localStorage.getItem('courses');
    if (storedCourses) {
      try {
        setCourses(JSON.parse(storedCourses));
      } catch (error) {
        console.error('Error parsing stored courses:', error);
      }
    }
  }, []);

  // Handle welcome completion
  const handleGetStarted = () => {
    setHasSeenWelcome(true);
    localStorage.setItem('hasSeenWelcome', 'true');
  };

  // Handle course creation
  const handleCreateCourse = (courseData: CourseData) => {
    const updatedCourses = [...courses, courseData];
    setCourses(updatedCourses);
    localStorage.setItem('courses', JSON.stringify(updatedCourses));
  };

  // Navigate to course detail page
  const handleCourseClick = (courseId: string) => {
    router.push(`/course/${courseId}`);
  };

  return (
    <div className="w-full max-w-md mx-auto h-screen overflow-hidden">
      {!hasSeenWelcome ? (
        <WelcomeScreen onGetStarted={handleGetStarted} />
      ) : (
        <DashboardScreen 
          courses={courses} 
          onCreateCourse={handleCreateCourse} 
        />
      )}
    </div>
  )
}

