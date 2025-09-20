// This file is machine-generated - edit at your own risk!

'use server';

/**
 * @fileOverview An AI agent that suggests job descriptions for farmers based on provided details.
 *
 * - suggestJobDescription - A function that generates a job description suggestion.
 * - SuggestJobDescriptionInput - The input type for the suggestJobDescription function.
 * - SuggestJobDescriptionOutput - The return type for the suggestJobDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestJobDescriptionInputSchema = z.object({
  workType: z
    .array(z.string())
    .describe('The type of work required for the job (e.g., harvesting, weeding).'),
  location: z.string().describe('The location of the job (district, city, or village).'),
  date: z.string().describe('The date when the job needs to be performed.'),
  numWorkersNeeded: z.number().describe('The number of workers required for the job.'),
  additionalDetails: z
    .string()
    .optional()
    .describe('Any additional details or requirements for the job.'),
});
export type SuggestJobDescriptionInput = z.infer<typeof SuggestJobDescriptionInputSchema>;

const SuggestJobDescriptionOutputSchema = z.object({
  jobDescription: z
    .string()
    .describe('A suggested job description based on the provided details.'),
});
export type SuggestJobDescriptionOutput = z.infer<typeof SuggestJobDescriptionOutputSchema>;

export async function suggestJobDescription(
  input: SuggestJobDescriptionInput
): Promise<SuggestJobDescriptionOutput> {
  return suggestJobDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestJobDescriptionPrompt',
  input: {schema: SuggestJobDescriptionInputSchema},
  output: {schema: SuggestJobDescriptionOutputSchema},
  prompt: `You are an expert agricultural assistant helping farmers create compelling job descriptions.

  Based on the details provided, generate a job description that is clear, concise, and attractive to potential workers.
  Include information about the work type, location, date, number of workers needed, and any additional details.

  Work Type: {{{workType}}}
  Location: {{{location}}}
  Date: {{{date}}}
  Number of Workers Needed: {{{numWorkersNeeded}}}
  Additional Details: {{{additionalDetails}}}

  Job Description:`,
});

const suggestJobDescriptionFlow = ai.defineFlow(
  {
    name: 'suggestJobDescriptionFlow',
    inputSchema: SuggestJobDescriptionInputSchema,
    outputSchema: SuggestJobDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
