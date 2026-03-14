"use client";

import Link from "next/link";
import { Mail, Instagram, X } from "lucide-react";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";

export default function Footer() {
  return (
    <footer className="border-t bg-zinc-100 py-16">
      <div className="container mx-auto px-4">

        {/* Name Hover Effect */}
        <div className="flex justify-center mb-10">
          <TextHoverEffect text="ADITYA" />
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-6 text-zinc-600">

          <Link
            href="mailto:soniadityakumar651@gmail.com"
            className="hover:text-indigo-500 transition-colors"
          >
            <Mail size={22} />
          </Link>

          <Link
            href="https://x.com/AdityaS69610269"
            target="_blank"
            className="hover:text-indigo-500 transition-colors"
          >
            <X size={22} />
          </Link>

          <Link
            href="https://www.instagram.com/adityakumarsoni28/"
            target="_blank"
            className="hover:text-indigo-500 transition-colors"
          >
            <Instagram size={22} />
          </Link>

        </div>

        {/* Copyright */}
        <p className="text-center text-sm text-zinc-500 mt-8">
          © {new Date().getFullYear()} Aditya. Build for Growth.
        </p>

      </div>
    </footer>
  );
}