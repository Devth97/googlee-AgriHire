"use server";

import { suggestDescription } from "@/ai/flows/job-description";
import { z } from "zod";

const schema = z.object({
  workType: z.array(z.string()).min(1, { message: 'Please select at least one work type.' }),
  location: z.string().min(1, { message: 'Please select a location.' }),
});

export async function generateJobDescriptionAction(formData: FormData) {
  const data = {
    workType: formData.getAll('workType').map(String),
    location: formData.get('location') as string,
  };

  const parsed = schema.safeParse(data);

  if (!parsed.success) {
    const errorMessages = parsed.error.issues.map(issue => issue.message).join(' ');
    return { error: errorMessages || 'Work type and location are required to generate a description.' };
  }

  try {
    const description = await suggestDescription({
      workType: parsed.data.workType,
      location: parsed.data.location,
    });
    return { description };
  } catch (e) {
    console.error(e);
    return { error: 'Failed to generate description. Please try again.' };
  }
}
