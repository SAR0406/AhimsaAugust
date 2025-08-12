'use server';

/**
 * @fileOverview An AI agent that verifies if a quiz answer is correct.
 *
 * - verifyQuizAnswer - A function that handles the answer verification process.
 * - VerifyQuizAnswerInput - The input type for the function.
 * - VerifyQuizAnswerOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const VerifyQuizAnswerInputSchema = z.object({
  question: z.string().describe("The quiz question."),
  options: z.array(z.string()).describe("The available options for the question."),
  providedAnswer: z.string().describe("The answer that the quiz marked as correct."),
  userSuggestedAnswer: z.string().describe("The answer the user believes is correct."),
});
export type VerifyQuizAnswerInput = z.infer<typeof VerifyQuizAnswerInputSchema>;

const VerifyQuizAnswerOutputSchema = z.object({
  isProvidedAnswerCorrect: z.boolean().describe("Whether the quiz's original answer was correct."),
  correctAnswer: z.string().describe("The actual correct answer."),
  explanation: z.string().describe("A detailed explanation of why the answer is correct or incorrect."),
});
export type VerifyQuizAnswerOutput = z.infer<typeof VerifyQuizAnswerOutputSchema>;

export async function verifyQuizAnswer(input: VerifyQuizAnswerInput): Promise<VerifyQuizAnswerOutput> {
  return verifyQuizAnswerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'verifyQuizAnswerPrompt',
  input: {schema: VerifyQuizAnswerInputSchema},
  output: {schema: VerifyQuizAnswerOutputSchema},
  prompt: `You are an AI fact-checker. A user is questioning a quiz answer about India's Independence Day.

  Question: "{{{question}}}"
  Options: {{{options}}}
  The quiz says the correct answer is: "{{{providedAnswer}}}"
  The user thinks the correct answer is: "{{{userSuggestedAnswer}}}"

  Your task is to:
  1. Determine if the answer provided by the quiz ("{{{providedAnswer}}}") is actually correct.
  2. Identify the true correct answer from the given options.
  3. Provide a clear explanation justifying your conclusion. Explain why the correct answer is right and why other options, including the one suggested by the user if it's wrong, are incorrect.
  `,
});

const verifyQuizAnswerFlow = ai.defineFlow(
  {
    name: 'verifyQuizAnswerFlow',
    inputSchema: VerifyQuizAnswerInputSchema,
    outputSchema: VerifyQuizAnswerOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
