import React from "react";
import { useId } from "react";

export default function FeaturesSectionDemo() {
  return (
    <div className="py-20 lg:py-40">
      <div className="max-w-7xl mx-auto mb-16 text-center">
        <h2 className="text-4xl font-bold text-black mb-4">
          Everything you need to manage your job search
        </h2>
        <p className="text-neutral-600 max-w-2xl mx-auto">
          Stay organized and never lose track of an application. Our tools help
          you manage your job hunt efficiently from one place.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 md:gap-2 max-w-7xl mx-auto">
        {grid.map((feature) => (
          <div
            key={feature.title}
            className="relative bg-linear-to-b dark:from-neutral-900 from-neutral-100 dark:to-neutral-950 to-white p-6 rounded-3xl overflow-hidden"
          >
            <Grid size={20} />

            <p className="text-base font-bold text-neutral-800 dark:text-white relative z-20">
              {feature.title}
            </p>

            <p className="text-neutral-600 dark:text-neutral-400 mt-4 text-base font-normal relative z-20">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

const grid = [
  {
    title: "Kanban Job Boards",
    description:
      "Organize your job applications with intuitive Kanban boards and track every stage from applied to offer.",
  },
  {
    title: "Application Tracking",
    description:
      "Keep track of every application in one place and never lose sight of important opportunities.",
  },
  {
    title: "Progress Monitoring",
    description:
      "Visualize your job search progress with clear status updates for interviews, rejections, and offers.",
  },
  {
    title: "Centralized Job Data",
    description:
      "Store company names, job roles, links, and notes in one centralized dashboard.",
  },
  {
    title: "Simple Workflow",
    description:
      "Move job applications across stages like Applied, Interview, and Offer with an easy drag-and-drop workflow.",
  },
  {
    title: "Stay Organized",
    description:
      "Never forget a job opportunity again by keeping your entire job search organized in one place.",
  },
  {
    title: "Clean Dashboard",
    description:
      "A minimal and distraction-free interface designed to help you focus on landing your next role.",
  },
  {
    title: "Fast & Lightweight",
    description:
      "Built with modern technology to give you a smooth and fast job tracking experience.",
  },
];

export const Grid = ({
  pattern,
  size,
}: {
  pattern?: number[][];
  size?: number;
}) => {
  const p =
    pattern ??
    [
      [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
      [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
      [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
      [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
      [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    ];

  return (
    <div className="pointer-events-none absolute left-1/2 top-0 -ml-20 -mt-2 h-full w-full [mask-image:linear-gradient(white,transparent)]">
      <div className="absolute inset-0 bg-gradient-to-r [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] dark:from-zinc-900/30 from-zinc-100/30 to-zinc-300/30 dark:to-zinc-900/30 opacity-100">
        <GridPattern
          width={size ?? 20}
          height={size ?? 20}
          x="-12"
          y="4"
          squares={p}
          className="absolute inset-0 h-full w-full mix-blend-overlay dark:fill-white/10 dark:stroke-white/10 stroke-black/10 fill-black/10"
        />
      </div>
    </div>
  );
};

export function GridPattern({ width, height, x, y, squares, ...props }: any) {
  const patternId = useId();

  return (
    <svg aria-hidden="true" {...props}>
      <defs>
        <pattern
          id={patternId}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>

      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${patternId})`} />

      {squares && (
        <svg x={x} y={y} className="overflow-visible">
          {squares.map(([x, y]: any) => (
            <rect
              strokeWidth="0"
              key={`${x}-${y}`}
              width={width + 1}
              height={height + 1}
              x={x * width}
              y={y * height}
            />
          ))}
        </svg>
      )}
    </svg>
  );
}