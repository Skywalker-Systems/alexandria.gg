import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Calculator, Lightbulb, Palette, Home, MessageCircle, Calendar, User } from "lucide-react"
import CourseCard from "./course-card"
import { CourseData } from "./create-course-modal"

interface DashboardScreenProps {
  courses: CourseData[];
  onCreateCourse: (courseData: CourseData) => void;
}

export default function DashboardScreen({ courses, onCreateCourse }: DashboardScreenProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Status Bar */}
      <div className="p-4 flex justify-between items-center">
        <span className="text-sm font-medium">9:41</span>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 text-foreground">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21ZM12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19Z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 pb-20">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-muted-foreground">Good morning,</p>
            <h1 className="text-2xl font-bold">Sarah Hessy</h1>
          </div>
          <div className="w-10 h-10 bg-accent rounded-lg"></div>
        </div>

        {/* Upcoming Class Card */}
        <Card className="bg-accent/10 p-6 mb-8 relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-xl font-semibold mb-1">Math class in</h3>
            <p className="text-3xl font-bold mb-4">30 minutes</p>
            <Button variant="default" className="bg-background text-foreground hover:bg-background/90">
              Join now
            </Button>
          </div>
        </Card>

        {/* Subject Icons */}
        <div className="flex gap-8 mb-8">
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Calculator className="w-6 h-6 text-primary" />
            </div>
            <span className="text-sm">Math</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
              <Lightbulb className="w-6 h-6 text-secondary" />
            </div>
            <span className="text-sm">Science</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
              <Palette className="w-6 h-6 text-accent" />
            </div>
            <span className="text-sm">Creat</span>
          </div>
        </div>

        {/* Courses */}
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">My Courses</h2>
          {courses.length > 0 && (
            <Button variant="link" className="text-sm text-primary p-0">
              See all
            </Button>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
            />
          ))}
          
          <CourseCard
            isAddCard={true}
            onCreateCourse={onCreateCourse}
          />
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4">
        <div className="flex justify-around items-center">
          <Button variant="ghost" className="flex flex-col items-center gap-1">
            <Home className="w-6 h-6 text-primary" />
            <span className="text-xs">Home</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center gap-1">
            <MessageCircle className="w-6 h-6" />
            <span className="text-xs">Chat</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center gap-1">
            <Calendar className="w-6 h-6" />
            <span className="text-xs">Schedule</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center gap-1">
            <User className="w-6 h-6" />
            <span className="text-xs">Profile</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

