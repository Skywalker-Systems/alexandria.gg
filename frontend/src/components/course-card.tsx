import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "./ui/card";
import CreateCourseModal from "./create-course-modal";
import { CourseData } from "./create-course-modal";
import { useRouter } from "next/navigation";

interface CourseCardProps {
  course?: CourseData;
  isAddCard?: boolean;
  onCreateCourse?: (courseData: CourseData) => void;
}

export default function CourseCard({ 
  course, 
  isAddCard = false, 
  onCreateCourse 
}: CourseCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleCardClick = () => {
    if (isAddCard) {
      setIsModalOpen(true);
    } else if (course) {
      router.push(`/course/${course.id}`);
    }
  };

  const handleCreateCourse = (courseData: CourseData) => {
    if (onCreateCourse) {
      onCreateCourse(courseData);
    }
  };

  if (isAddCard) {
    return (
      <>
        <Card
          className="bg-muted p-4 rounded-xl cursor-pointer hover:bg-muted/80 transition-colors"
          onClick={handleCardClick}
        >
          <div className="h-32 bg-secondary/10 rounded-lg mb-4 flex items-center justify-center">
            <span className="text-3xl text-secondary/40">+</span>
          </div>
          <h3 className="font-semibold">Add New Course</h3>
        </Card>

        <CreateCourseModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onCreateCourse={handleCreateCourse} 
        />
      </>
    );
  }

  return (
    <Card
      className="bg-muted p-4 rounded-xl cursor-pointer hover:bg-muted/80 transition-colors"
      onClick={handleCardClick}
    >
      <div 
        className="h-32 rounded-lg mb-4 bg-cover bg-center"
        style={{ backgroundImage: course?.thumbnailUrl ? `url(${course.thumbnailUrl})` : "none" }}
      >
        {!course?.thumbnailUrl && <div className="h-full w-full bg-primary/10 rounded-lg"></div>}
      </div>
      <h3 className="font-semibold">{course?.title}</h3>
    </Card>
  );
}