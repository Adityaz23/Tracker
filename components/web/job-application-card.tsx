"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  deleteJobApplication,
  updateJobApplication,
} from "@/lib/actions/job-applications";
import { Column, JobApplications } from "@/lib/models/models.types";
import {
  Edit2Icon,
  ExternalLink,
  MoreVertical,
  Trash2Icon,
} from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

interface JobApplicationCardProps {
  job: JobApplications;
  columns: Column[];
  dragHandleProps?:React.HTMLAttributes<HTMLElement>
}

export default function JobApplicationCard({
  job,
  columns,
  dragHandleProps,
}: JobApplicationCardProps) {
  // For the user when they are editing :-
  const [isEditing, setIsEditing] = useState(false);
  // The form data for the dialog component :-
  const [formData, setFormData] = useState({
    company: job.company,
    postition: job.position,
    location: job.location || "",
    columnId: job.columnId || "",
    salary: job.salary || "",
    tags: job.tags?.join(", ") || "",
    jobUrl: job.jobUrl || "",
    notes: job.notes || "",
    description: job.description || "",
  });

  // Calling the handle delete function :-
  async function handleDelete() {
    try {
      const result = await deleteJobApplication(job._id);

      if (result?.error) {
        console.error(result.error);
      }
    } catch (err) {
      console.error("Failed to delete job application:", err);
    }
  }
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

  // Calling the handleUpdate function :-
  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    try {
      const result = await updateJobApplication(job._id, {
        ...formData,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag.length > 0),
      });

      if (!result.error) {
        setIsEditing(false);
      }
    } catch (err) {
      console.error("Failed to move job application: ", err);
    }
  }
  return (
    <>
      <Card className="group relative rounded-xl border bg-white hover:shadow-md transition-all duration-200 cursor-pointer" 
      {...dragHandleProps}
      >
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
                  <DropdownMenuItem
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => setIsEditing(true)}
                  >
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

                  <DropdownMenuItem
                    className="flex items-center gap-2 text-red-600 focus:text-red-600 cursor-pointer"
                    onClick={() => handleDelete()}
                  >
                    <Trash2Icon className="h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent
          className="w-[95vw] sm:max-w-lg md:max-w-xl lg:max-w-2xl 
max-h-[90vh] overflow-y-auto rounded-xl border shadow-lg p-6"
        >
          <DialogHeader className="space-y-1">
            <DialogTitle className="text-xl font-semibold">
              Add Job Application
            </DialogTitle>

            <DialogDescription className="text-sm text-muted-foreground">
              Track a new job application.
            </DialogDescription>
          </DialogHeader>

          <form className="mt-4 space-y-5" onSubmit={handleUpdate}>
            <div className="space-y-5">
              {/* Company + Position */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company">Company *</Label>
                  <Input
                    id="company"
                    required
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="position">Position *</Label>
                  <Input
                    id="position"
                    required
                    value={formData.postition}
                    onChange={(e) =>
                      setFormData({ ...formData, postition: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Location + Salary */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="salary">Salary</Label>
                  <Input
                    id="salary"
                    placeholder="eg., $100k - $150k"
                    value={formData.salary}
                    onChange={(e) =>
                      setFormData({ ...formData, salary: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* URL */}
              <div className="space-y-2">
                <Label htmlFor="jobUrl">Job Url</Label>
                <Input
                  id="jobUrl"
                  placeholder="https://company.com/jobs"
                  value={formData.jobUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, jobUrl: e.target.value })
                  }
                />
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input
                  id="tags"
                  placeholder="Frontend, React, Remote"
                  value={formData.tags}
                  onChange={(e) =>
                    setFormData({ ...formData, tags: e.target.value })
                  }
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  rows={4}
                  placeholder="Job description..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  rows={3}
                  placeholder="Add your notes..."
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                />
              </div>
            </div>

            <DialogFooter className="flex flex-col sm:flex-row gap-3 sm:justify-end pt-2">
              <Button
                type="button"
                variant="destructive"
                className="w-full sm:w-auto"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700"
              >
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
