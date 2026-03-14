"use client";

import { BriefcaseBusinessIcon } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import SignOutButton from "./signout";
import { useSession } from "@/lib/auth/auth-client";

export default function Navbar() {
  const { data: session } = useSession();
  return (
   <nav className="border-b border-gray-200 bg-white rounded-b-2xl">
  <div className="mx-auto max-w-6xl px-4">
    <div className="flex h-16 items-center justify-between">

      {/* Logo */}
      <Link
        href="/"
        className="flex items-center gap-2 text-lg sm:text-xl font-semibold text-gray-800"
      >
        <BriefcaseBusinessIcon size={26} className="text-pink-600" />
        <span className="text-pink-600">

        Job Tracker
        </span>
      </Link>

      {/* Right Section */}
      <div className="flex items-center gap-3 sm:gap-4">

        {session?.user ? (
          <>
            <Link href="/dashboard" >
              <Button
                variant="ghost"
                className="text-gray-700 hover:text-black"
              >
                Dashboard
              </Button>
            </Link>

            {/* Avatar Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="rounded-full h-9 w-9 p-0 hover:bg-gray-100"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-pink-500 text-white font-semibold">
                      {session.user.name[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="w-56 border border-gray-200 bg-white shadow-lg rounded-lg"
              >
                <DropdownMenuLabel className="px-3 py-2">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium text-gray-900">
                      {session.user.name}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {session.user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>

                <div className="h-px bg-gray-200 my-1" />

                <SignOutButton />
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <>
            <Link href="/sign-in">
              <Button
                variant="ghost"
                className="hidden sm:inline-flex"
              >
                Log In
              </Button>
            </Link>

            <Link href="/sign-up">
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                Start free
              </Button>
            </Link>
          </>
        )}

      </div>
    </div>
  </div>
</nav>
  );
}
