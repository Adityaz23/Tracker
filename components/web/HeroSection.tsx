"use client";
import { NoiseBackground } from "../ui/noise-background";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogInIcon } from "lucide-react";
import { EncryptedText } from "../ui/encrypted-text";

export default function HeroSection() {
  return (
    <div className="relative overflow-hidden">
      <NoiseBackground>
        <section className="container mx-auto px-4 py-32">
          <div className="mx-auto max-w-4xl items-center flex flex-col text-center">
            <motion.h1
              className="text-black mb-6 text-6xl font-bold"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              A better way to track your job application.
            </motion.h1>
            <div className="mx-auto mb-10 flex max-w-2xl items-center justify-center">
              <p className="text-center text-lg md:text-xl text-zinc-600 leading-relaxed">
                Capture, organize and track your job applications{" "}
                <span className="font-medium text-zinc-900">
                  <EncryptedText text="all in one place." />
                </span>
              </p>
            </div>
            <div className="flex flex-col items-center gap-4">
              <Link href={"/sign-up"}>
                <Button
                  size={"lg"}
                  className="h-10 px-8 text-lg font-medium rounded-xl bg-gray-300 text-gray-700  hover:bg-indigo-500 hover:text-white shadow-sm cursor-pointer"
                >
                  Start For Free
                  <LogInIcon className="ml-2" />
                </Button>
              </Link>
              <p className="text-slate-800 text-sm">
                Free forever no credit card required.
              </p>
            </div>
          </div>
        </section>
      </NoiseBackground>
    </div>
  );
}
