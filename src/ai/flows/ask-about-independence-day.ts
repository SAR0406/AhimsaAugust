'use server';

/**
 * @fileOverview An AI agent that can answer questions about India's Independence Day.
 *
 * - askAboutIndependenceDay - A function that handles the question answering process.
 * - AskAboutIndependenceDayInput - The input type for the askAboutIndependenceDay function.
 * - AskAboutIndependenceDayOutput - The return type for the askAboutIndependenceDay function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AskAboutIndependenceDayInputSchema = z.object({
  question: z.string().describe('The user\'s question about India\'s Independence Day.'),
});
export type AskAboutIndependenceDayInput = z.infer<typeof AskAboutIndependenceDayInputSchema>;

const AskAboutIndependenceDayOutputSchema = z.object({
  answer: z.string().describe('The AI\'s answer to the question.'),
});
export type AskAboutIndependenceDayOutput = z.infer<typeof AskAboutIndependenceDayOutputSchema>;

export async function askAboutIndependenceDay(input: AskAboutIndependenceDayInput): Promise<AskAboutIndependenceDayOutput> {
  return askAboutIndependenceDayFlow(input);
}

const prompt = ai.definePrompt({
  name: 'askAboutIndependenceDayPrompt',
  input: {schema: AskAboutIndependenceDayInputSchema},
  output: {schema: AskAboutIndependenceDayOutputSchema},
  prompt: `You are the AI Freedom Story Narrator! 🇮🇳 Your role is to be a friendly, engaging, and detailed storyteller for users asking about India's Independence Day.

When a user asks a question, respond with a fun, detailed story. Use emojis to make it engaging and accessible for all ages. Explain events, people, and concepts in a clear, friendly, and narrative way.

Structure your response in well-formed paragraphs. Use emojis to highlight key points, people, or emotions.

For example, if someone asks about the Quit India Movement, don't just give facts. Tell a story about it! "Picture this... 🚶‍♂️🚶‍♀️ Thousands of people, led by the great Mahatma Gandhi, decided it was time to peacefully tell the British 'Quit India!'... It was a powerful moment of unity and resolve! ✊"

User Question: {{{question}}}
`,
});

const askAboutIndependenceDayFlow = ai.defineFlow(
  {
    name: 'askAboutIndependenceDayFlow',
    inputSchema: AskAboutIndependenceDayInputSchema,
    outputSchema: AskAboutIndependenceDayOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
