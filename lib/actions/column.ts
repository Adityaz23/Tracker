"use server";

import { Column, JobApplication } from "@/lib/models";
import connectionDB from "@/lib/db";
import { getSession } from "@/lib/auth/auth";
import { revalidatePath } from "next/cache";

export async function deleteColumn(columnId: string) {
  const session = await getSession();
  if (!session?.user) return { error: "Unauthorized" };

  await connectionDB();

  const column = await Column.findById(columnId);
  if (!column) return { error: "Column not found" };

  // delete jobs in this column
  await JobApplication.deleteMany({ columnId });

  // delete column
  await Column.findByIdAndDelete(columnId);

  revalidatePath("/dashboard");

  return { success: true };
}