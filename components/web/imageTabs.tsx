"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { useState } from "react";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";

export default function ImageTabs() {
  const [isActive, setIsActive] = useState("organize");

  return (
    <section className="border-t bg-zinc-50 py-16 rounded-t-2xl">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          {/* Tabs */}
          <div className="flex gap-2 justify-center mb-8">
            <Button
              className={`rounded-lg px-6 py-3 text-sm font-medium transition-colors ${
                isActive === "organize"
                  ? "bg-indigo-500 text-white"
                  : "bg-gray-300 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setIsActive("organize")}
            >
              Organize Applications
            </Button>

            <Button
              className={`rounded-lg px-6 py-3 text-sm font-medium transition-colors ${
                isActive === "hired"
                  ? "bg-indigo-500 text-white"
                  : "bg-gray-300 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setIsActive("hired")}
            >
              Get Hired
            </Button>

            <Button
              className={`rounded-lg px-6 py-3 text-sm font-medium transition-colors ${
                isActive === "boards"
                  ? "bg-indigo-500 text-white"
                  : "bg-gray-300 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setIsActive("boards")}
            >
              Manage Boards
            </Button>
          </div>

          {/* 3D Card Image */}
          <CardContainer className="w-full">
            <CardBody className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-xl border border-gray-200 shadow-2xl">
              <CardItem translateZ="100" className="w-full">
                <div className="relative w-full aspect-16/6">
                  {isActive === "organize" && (
                    <Image
                      src="/images/hero1.png"
                      alt="Organize Applications"
                      fill
                      className="object-contain"
                    />
                  )}

                  {isActive === "hired" && (
                    <Image
                      src="/images/hero2.png"
                      alt="Get Hired"
                      fill
                      className="object-contain"
                    />
                  )}

                  {isActive === "boards" && (
                    <Image
                      src="/images/hero3.png"
                      alt="Manage Boards"
                      fill
                      className="object-contain"
                    />
                  )}
                </div>
              </CardItem>
            </CardBody>
          </CardContainer>
        </div>
      </div>
    </section>
  );
}
