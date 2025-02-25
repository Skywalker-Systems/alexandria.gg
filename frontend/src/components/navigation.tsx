import { Button } from "./ui/button";
import { Home, MessageCircle, Calendar, User } from "lucide-react";

export default function Navigation() {
  return (
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
  );
}