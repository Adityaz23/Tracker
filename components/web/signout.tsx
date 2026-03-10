"use client";

import { signOut } from "@/lib/auth/auth-client";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { LogOutIcon } from "lucide-react";

export default function SignOutButton() {
  const router = useRouter();

  return (
    <DropdownMenuItem
      className="flex items-center gap-2 text-red-600 focus:text-red-600 hover:text-red-600 focus:bg-red-50 hover:bg-red-50 cursor-pointer"
      onClick={async () => {
        const result = await signOut();
        if (result.data) {
          router.push("/sign-in");
        } else {
          alert("Error signing out");
        }
      }}
    >
      <LogOutIcon size={16} className="hover:text-destructive"/>
      Log out
    </DropdownMenuItem>
  );
}