import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

interface CreateCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateCourse: (courseData: CourseData) => void;
}

export interface CourseData {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  tags: string[];
  videoId: string;
}

export default function CreateCourseModal({ isOpen, onClose, onCreateCourse }: CreateCourseModalProps) {
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [courseTitle, setCourseTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!youtubeUrl.trim()) {
      setError("Please enter a YouTube URL");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/thumbnail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ videoUrl: youtubeUrl }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch video data");
      }

      const data = await response.json();
      
      // Use the API-provided title if no custom title was entered
      const finalTitle = courseTitle.trim() || data.title;
      
      const courseData: CourseData = {
        id: Date.now().toString(), // Generate a unique ID for the course
        title: finalTitle,
        description: data.description,
        thumbnailUrl: data.thumbnailUrl,
        tags: data.tags,
        videoId: data.videoId
      };
      
      onCreateCourse(courseData);
      setYoutubeUrl("");
      setCourseTitle("");
      onClose();
      
      // Navigate to the newly created course
      router.push(`/course/${courseData.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Course</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="youtubeUrl">YouTube URL</Label>
              <Input
                id="youtubeUrl"
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="courseTitle">Course Title (Optional)</Label>
              <Input
                id="courseTitle"
                value={courseTitle}
                onChange={(e) => setCourseTitle(e.target.value)}
                placeholder="Leave blank to use YouTube title"
              />
            </div>

            {error && (
              <div className="text-sm text-red-500">{error}</div>
            )}
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Course"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
} 