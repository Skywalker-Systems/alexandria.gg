import { Button } from "@/components/ui/button"
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"

export function Nav() {
    return (
        <nav className="border-b">
            <div className="flex h-16 items-center px-4 container mx-auto justify-between">
                <div className="font-semibold text-lg">Alexandria</div>
                <div>
                    <SignedOut>
                        <SignInButton mode="modal">
                            <Button variant="ghost">Sign In</Button>
                        </SignInButton>
                    </SignedOut>
                    <SignedIn>
                        <UserButton afterSignOutUrl="/" />
                    </SignedIn>
                </div>
            </div>
        </nav>
    )
}
