import { Column, JobApplications } from "@/lib/models/models.types";
import {
  Edit2Icon,
  ExternalLink,
  MoreVertical,
  Trash2Icon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { updateJobApplication } from "@/lib/actions/job-applications";

interface JobApplicationCardProps {
  job: JobApplications;
  columns: Column[];
}

export default function JobApplicationCard({
  job,
  columns,
}: JobApplicationCardProps) {
  // calling the drop and down edits: -
  async function handleMove(newColumnId: string) {
    try {
      const result = await updateJobApplication(job._id, {
        columnId: newColumnId,
      });
    } catch (err) {
      console.error("Failed to move job application: ", err);
    }
  }
  return (
    <div>
      <Card className="group relative rounded-xl border bg-white hover:shadow-md transition-all duration-200 cursor-pointer">
        <CardContent className="p-4">
          <div className="flex justify-between gap-3">
            {/* LEFT CONTENT */}
            <div className="flex-1 min-w-0">
              {/* Position */}
              <h3 className="font-semibold text-sm text-gray-900 truncate">
                {job.position}
              </h3>

              {/* Company */}
              <p className="text-xs text-muted-foreground mb-2">
                {job.company}
              </p>

              {/* Description */}
              {job.description && (
                <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                  {job.description}
                </p>
              )}

              {/* Tags */}
              {job.tags && job.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-2">
                  {job.tags.map((tag, key) => (
                    <span
                      key={key}
                      className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-blue-50 text-blue-600 border border-blue-100"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Job URL */}
              {job.jobUrl && (
                <a
                  href={job.jobUrl}
                  target="_blank"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-700 hover:underline"
                >
                  <ExternalLink className="h-3 w-3" />
                  View Job
                </a>
              )}
            </div>

            {/* RIGHT ACTIONS */}
            <div className="flex items-start opacity-0 group-hover:opacity-100 transition">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-muted-foreground hover:bg-gray-100"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="w-44 rounded-lg shadow-lg border bg-white"
                >
                  <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                    <Edit2Icon className="h-4 w-4 text-muted-foreground" />
                    Edit
                  </DropdownMenuItem>

                  {columns.length > 1 && (
                    <>
                      {columns
                        .filter((c) => c._id !== job.columnId)
                        .map((column) => (
                          <DropdownMenuItem
                            key={column._id}
                            className="text-xs text-muted-foreground"
                            onClick={() => handleMove(column._id)}
                          >
                            Move to {column.name}
                          </DropdownMenuItem>
                        ))}
                    </>
                  )}

                  <DropdownMenuItem className="flex items-center gap-2 text-red-600 focus:text-red-600 cursor-pointer">
                    <Trash2Icon className="h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
