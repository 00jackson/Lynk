// apps/web/components/ui/navbar.tsx
import Link from "next/link";
import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

export const Navbar = () => (
  <nav className="flex items-center justify-between px-6 py-4 border-b shadow-sm bg-white">
    <Link href="/" className="text-2xl font-bold text-blue-600">
      Lynk
    </Link>
    <div className="flex items-center gap-4">
      <SignedOut>
        <SignInButton mode="modal">
          <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700">
            Sign In
          </button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  </nav>
);