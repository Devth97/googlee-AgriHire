"use server";

// Mock AI flow. In a real application, this would be a pre-existing file.
// It should not be modified by the developer.
export async function suggestDescription(inputs: {
  workType: string[];
  location: string;
}): Promise<string> {
  // In a real scenario, this would call a GenAI model.
  // For this mock, we'll return a pre-defined string based on inputs.
  await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay

  const workTypes = inputs.workType.join(', ');
  const description = `Seeking hardworking individuals for agricultural work in ${inputs.location}. The tasks will primarily involve ${workTypes}. This is a great opportunity to contribute to our farm's success. The work requires physical stamina and attention to detail. We are looking for reliable and punctual workers to join our team for the upcoming season.`;

  return description;
}
