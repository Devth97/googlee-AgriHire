
"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";

const jobFormSchema = z.object({
  location: z.string().min(1, "Please select a location."),
  date: z.date({
    required_error: "A date for the job is required.",
  }),
  workType: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one work type.",
  }),
  workersRequired: z.coerce.number().min(1, "At least one worker is required."),
  description: z.string().optional(),
});


export async function createJobAction(values: z.infer<typeof jobFormSchema>) {
    // This is a mock action.
    console.log("Simulating job creation with values:", values);
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { success: "Job posted successfully! (simulation)" };
}


export async function acceptJobAction(jobId: string) {
  if (!jobId) {
    return { error: "Job ID is missing." };
  }

  // Simulate a successful API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  console.log("Job accepted (mock):", jobId);
  
  revalidatePath('/worker');
  return { success: true };
}
