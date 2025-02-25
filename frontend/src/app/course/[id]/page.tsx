'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import CourseDetailScreen from '@/components/course-detailsScreen';
import { CourseData } from '@/components/create-course-modal';

export default function CourseDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [course, setCourse] = useState<CourseData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real application, you would fetch the course data from an API or database
    // For now, we'll use localStorage as a simple client-side data store
    const fetchCourse = () => {
      setLoading(true);
      try {
        const storedCourses = localStorage.getItem('courses');
        if (storedCourses) {
          const courses: CourseData[] = JSON.parse(storedCourses);
          const foundCourse = courses.find(c => c.id === params.id);
          if (foundCourse) {
            setCourse(foundCourse);
          }
        }
      } catch (error) {
        console.error('Error fetching course:', error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchCourse();
    }
  }, [params.id]);

  const handleBack = () => {
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4">Course not found</h1>
        <p className="mb-6">The course you're looking for doesn't exist or has been removed.</p>
        <button 
          onClick={handleBack}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
        >
          Go back to courses
        </button>
      </div>
    );
  }

  return <CourseDetailScreen course={course} onBack={handleBack} />;
} 