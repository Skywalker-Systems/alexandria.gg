import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "./ui/card";
import CreateCourseModal from "./create-course-modal";

interface CourseCardProps {
  title?: string;
  thumbnailUrl?: string;
  isAddCard?: boolean;
  onClick?: () => void;
  onCreateCourse?: (title: string, thumbnailUrl: string) => void;
}

export default function CourseCard({ 
  title, 
  thumbnailUrl, 
  isAddCard = false, 
  onClick,
  onCreateCourse 
}: CourseCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = () => {
    if (isAddCard) {
      setIsModalOpen(true);
    } else if (onClick) {
      onClick();
    }
  };

  const handleCreateCourse = (title: string, thumbnailUrl: string) => {
    if (onCreateCourse) {
      onCreateCourse(title, thumbnailUrl);
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
      onClick={onClick}
    >
      <div 
        className="h-32 rounded-lg mb-4 bg-cover bg-center"
        style={{ backgroundImage: thumbnailUrl ? `url(${thumbnailUrl})` : "none" }}
      >
        {!thumbnailUrl && <div className="h-full w-full bg-primary/10 rounded-lg"></div>}
      </div>
      <h3 className="font-semibold">{title}</h3>
    </Card>
  );
}