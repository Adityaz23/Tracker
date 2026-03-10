"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import { useState } from "react";
export default function ImageTabs() {
  const [isActive, setIsActive] = useState("organize");
  return (
    <section className="border-t bg-zinc-50 py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          {/* Different Tabs for the switching :- */}
          <div className="flex gap-2 justify-center mb-8">
            <Button
              className={`rounded-lg px-6 py-3 text-sm font-medium transition-colors ${isActive === "organize" ? "bg-indigo-500 text-white" : "bg-gray-300 text-gray-700 hover:bg-gray-200"}`}
              onClick={() => setIsActive("organize")}
            >
              Organize Applications
            </Button>
            <Button
              className={`rounded-lg px-6 py-3 text-sm font-medium transition-colors ${isActive === "hired" ? "bg-indigo-500 text-white" : "bg-gray-300 text-gray-700 hover:bg-gray-200"}`}
              onClick={() => setIsActive("hired")}
            >
              Get Hired
            </Button>
            <Button
              className={`rounded-lg px-6 py-3 text-sm font-medium transition-colors ${isActive === "boards" ? "bg-indigo-500 text-white" : "bg-gray-300 text-gray-700 hover:bg-gray-200"}`}
              onClick={() => setIsActive("boards")}
            >
              Manage Borads
            </Button>
          </div>
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-lg border border-gray-200 shadow-2xl">
            {isActive === "organize" && (
              <Image
                src={"/images/hero1.png"}
                alt="hero"
                width={1200}
                height={800}
              />
            )}
            {isActive === "hired" && (
              <Image
                src={"/images/hero2.png"}
                alt="hero"
                width={1200}
                height={800}
              />
            )}
            {isActive === "boards" && (
              <Image
                src={"/images/hero3.png"}
                alt="hero"
                width={1200}
                height={800}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
