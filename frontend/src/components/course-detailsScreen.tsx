import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Bookmark, Play, Lock } from "lucide-react"

interface CourseDetailScreenProps {
  onBack: () => void
}

export default function CourseDetailScreen({ onBack }: CourseDetailScreenProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Status Bar */}
      <div className="p-4 flex justify-between items-center">
        <span className="text-sm font-medium">9:41</span>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4">
            <svg viewBox="0 0 24 24" className="fill-current">
              <path d="M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21ZM12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19Z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="px-4 mb-6 flex justify-between items-start">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <Button variant="ghost" size="icon">
          <Bookmark className="w-6 h-6" />
        </Button>
      </div>

      {/* Course Title */}
      <div className="px-4 mb-8">
        <h1 className="text-3xl font-bold mb-2">Drawing practice</h1>
      </div>

      {/* Tabs */}
      <div className="px-4 mb-6">
        <div className="flex gap-4 border-b border-border">
          <Button variant="ghost" className="relative px-0 pb-4 text-primary">
            Description
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></span>
          </Button>
          <Button variant="ghost" className="px-0 pb-4 text-muted-foreground">
            Playlist
          </Button>
        </div>
      </div>

      {/* Lesson List */}
      <div className="px-4 space-y-4">
        <Card className="p-4 flex items-center gap-4 bg-muted">
          <Button size="icon" className="h-12 w-12 rounded-full bg-primary text-primary-foreground">
            <Play className="w-6 h-6" />
          </Button>
          <div className="flex-1">
            <h3 className="font-semibold">Introduction</h3>
            <p className="text-sm text-muted-foreground">23 minutes</p>
          </div>
        </Card>

        <Card className="p-4 flex items-center gap-4 bg-muted">
          <Button size="icon" className="h-12 w-12 rounded-full bg-accent/20 text-accent">
            <Play className="w-6 h-6" />
          </Button>
          <div className="flex-1">
            <h3 className="font-semibold">Simple sketch</h3>
            <p className="text-sm text-muted-foreground">12 minutes</p>
          </div>
          <Lock className="w-5 h-5 text-muted-foreground" />
        </Card>

        <Card className="p-4 flex items-center gap-4 bg-muted">
          <Button size="icon" className="h-12 w-12 rounded-full bg-accent/20 text-accent">
            <Play className="w-6 h-6" />
          </Button>
          <div className="flex-1">
            <h3 className="font-semibold">Coloring</h3>
            <p className="text-sm text-muted-foreground">30 minutes</p>
          </div>
          <Lock className="w-5 h-5 text-muted-foreground" />
        </Card>
      </div>

      {/* Start Learning Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border">
        <Button className="w-full h-12 text-lg bg-accent text-accent-foreground hover:bg-accent/90">
          Start learning
        </Button>
      </div>
    </div>
  )
}

