"use client";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import React, { useState } from "react";

interface CreateJobApplicationProps {
  columnId: string;
  boardId: string;
}

async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();

  try {
        
  } catch (error) {
        console.error(error)
  }
}

export default function CreateJobApplicationDialog({
  columnId,
  boardId,
}: CreateJobApplicationProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    company: "",
    position: "",
    notes: "",
    salary: "",
    location: "",
    jobUrl: "",
    tags: "",
    description: "",
  });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button
          variant={"outline"}
          className="hover:bg-pink-500 hover:text-olive-100 text-zinc-800 border rounded-lg w-full mb-4 justify-start"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Job
        </Button>
      </DialogTrigger>
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

        <form className="mt-4 space-y-5" onSubmit={handleSubmit}>
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
                  value={formData.position}
                  onChange={(e) =>
                    setFormData({ ...formData, position: e.target.value })
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
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700"
            >
              Add Application
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
