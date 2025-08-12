'use server';

/**
 * @fileOverview An AI agent that provides detailed information about historical events.
 *
 * - getMoreInfoAboutHistoryEvent - A function that handles the information retrieval process.
 * - GetMoreInfoAboutHistoryEventInput - The input type for the function.
 * - GetMoreInfoAboutHistoryEventOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetMoreInfoAboutHistoryEventInputSchema = z.object({
  year: z.string().describe("The year of the historical event."),
  title: z.string().describe("The title of the historical event."),
  description: z.string().describe("A brief description of the historical event."),
});
export type GetMoreInfoAboutHistoryEventInput = z.infer<typeof GetMoreInfoAboutHistoryEventInputSchema>;

const GetMoreInfoAboutHistoryEventOutputSchema = z.object({
  moreInfo: z.string().describe("A detailed explanation of the historical event."),
});
export type GetMoreInfoAboutHistoryEventOutput = z.infer<typeof GetMoreInfoAboutHistoryEventOutputSchema>;

export async function getMoreInfoAboutHistoryEvent(input: GetMoreInfoAboutHistoryEventInput): Promise<GetMoreInfoAboutHistoryEventOutput> {
  return getMoreInfoAboutHistoryEventFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getMoreInfoAboutHistoryEventPrompt',
  input: {schema: GetMoreInfoAboutHistoryEventInputSchema},
  output: {schema: GetMoreInfoAboutHistoryEventOutputSchema},
  prompt: `You are an expert historian specializing in India's independence movement.
  
  A user wants to know more about the following historical event:
  - Year: {{{year}}}
  - Title: {{{title}}}
  - Description: {{{description}}}

  Please provide a more detailed explanation of this event. Your response should be engaging and informative for a general audience.
  
  Please structure your response as follows:
  - **Background:** Briefly set the context for the event.
  - **Key Figures:** List the key people involved and their roles (e.g., using bullet points).
  - **Main Events:** Describe what happened during the event in a narrative style.
  - **Impact & Significance:** Explain the event's broader impact on the freedom struggle.
  - **Lesser-Known Fact:** Include one interesting and lesser-known fact about the event.
  `,
});

const getMoreInfoAboutHistoryEventFlow = ai.defineFlow(
  {
    name: 'getMoreInfoAboutHistoryEventFlow',
    inputSchema: GetMoreInfoAboutHistoryEventInputSchema,
    outputSchema: GetMoreInfoAboutHistoryEventOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
