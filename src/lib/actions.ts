
"use server";

import { z } from "zod";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp, doc, updateDoc } from "firebase/firestore";
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
    const validatedFields = jobFormSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid data provided." };
    }
    
    const { location, date, workType, workersRequired, description } = validatedFields.data;

    try {
        await addDoc(collection(db, "jobs"), {
            title: `${workType.join(', ')} in ${location}`,
            location,
            date: date.toISOString(),
            workersNeeded: workersRequired,
            workType: workType,
            description: description || "",
            status: 'Open',
            farmer: { name: 'Ramesh Kumar', avatarUrl: 'https://picsum.photos/seed/f5/40/40' },
            createdAt: serverTimestamp()
        });
        
        revalidatePath('/farmer');
        revalidatePath('/worker');
        return { success: "Job posted successfully!" };

    } catch (error) {
        console.error("Error creating job:", error);
        return { error: "Failed to post job." };
    }
}


export async function acceptJobAction(jobId: string) {
  if (!jobId) {
    return { error: "Job ID is missing." };
  }

  try {
    const jobRef = doc(db, "jobs", jobId);
    await updateDoc(jobRef, {
      status: "Confirmed",
    });
    
    revalidatePath('/worker');
    return { success: true };

  } catch (error) {
    console.error("Error accepting job:", error);
    return { error: "Failed to accept the job. Please try again." };
  }
}

