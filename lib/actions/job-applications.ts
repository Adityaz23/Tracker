"use server";

import { error } from "console";
import { getSession } from "../auth/auth";
import connectionDB from "../db";
import { Board, Column, JobApplication } from "../models";
import { revalidatePath } from "next/cache";

interface JobApplicationData {
  company: string;
  position: string;
  notes?: string;
  salary?: string;
  location?: string;
  jobUrl: string;
  tags?: string[];
  description?: string;
  boardId: string;
  columnId: string;
}
export default async function createJobApplication(data: JobApplicationData) {
  const session = await getSession();

  if (!session?.user) {
    return { error: "Unauthorised" };
  }
  await connectionDB();

  const {
    company,
    position,
    salary,
    notes,
    location,
    jobUrl,
    tags,
    columnId,
    boardId,
    description,
  } = data;

  if (!company || !position || !columnId || !boardId) {
    return { error: "Missing required fields" };
  }
  // Verifying thr board ownership :-
  const board = await Board.findOne({
    _id: boardId,
    userId: session.user.id,
  });
  if (!board) {
    return { error: "Board not found" };
  }

  // Verifying column belongs to the board :-
  const column = await Column.findOne({
    _id: columnId,
    boardId: boardId,
  });
  if (!column) {
    return { error: "Column not found" };
  }

  // Sorting the column to the latest one in the descending order :-
  const maxOrder = (await JobApplication.findOne({ columnId })
    .sort({ order: -1 })
    .select("order")
    .lean()) as { order: number } | null;

  const jobApplication = await JobApplication.create({
    company,
    location,
    position,
    jobUrl,
    notes,
    columnId,
    boardId,
    userId: session.user.id,
    description,
    tags: tags || [],
    status: "applied",
    order: maxOrder ? maxOrder.order + 1 : 0,
  });
  await Column.findByIdAndUpdate(columnId, {
    $push: { jobApplications: jobApplication._id },
  });

  revalidatePath("/dashboard");

  return { data: JSON.parse(JSON.stringify(jobApplication)) };
}
