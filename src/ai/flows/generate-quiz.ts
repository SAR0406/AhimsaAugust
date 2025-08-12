'use server';

/**
 * @fileOverview An AI agent that generates a quiz about India's Independence Day.
 *
 * - generateQuiz - A function that handles the quiz generation process.
 * - GenerateQuizInput - The input type for the generateQuiz function.
 * - GenerateQuizOutput - The return type for the generateQuiz function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateQuizInputSchema = z.object({
  userClass: z.string().describe("The user's class or grade level (e.g., '8th Grade', 'University')."),
  difficulty: z.string().describe("The desired difficulty of the quiz (e.g., 'Easy', 'Medium', 'Hard')."),
  numQuestions: z.number().describe("The number of questions to generate."),
});
export type GenerateQuizInput = z.infer<typeof GenerateQuizInputSchema>;

const QuizQuestionSchema = z.object({
    question: z.string(),
    options: z.array(z.string()),
    correctAnswer: z.string(),
    explanation: z.string(),
});

const GenerateQuizOutputSchema = z.object({
  questions: z.array(QuizQuestionSchema),
});
export type GenerateQuizOutput = z.infer<typeof GenerateQuizOutputSchema>;

export async function generateQuiz(input: GenerateQuizInput): Promise<GenerateQuizOutput> {
  return generateQuizFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateQuizPrompt',
  input: {schema: GenerateQuizInputSchema},
  output: {schema: GenerateQuizOutputSchema},
  prompt: `You are an expert quiz creator specializing in India's Independence Day. Generate a quiz with the following specifications:

- Topic: India's Independence Day (August 15th)
- User's Class/Level: {{{userClass}}}
- Difficulty: {{{difficulty}}}
- Number of Questions: {{{numQuestions}}}

For each question, provide:
1. A clear and concise question.
2. Four multiple-choice options.
3. The correct answer.
4. A brief explanation for the correct answer.

Ensure the questions are appropriate for the specified class level and difficulty.
`,
});

const generateQuizFlow = ai.defineFlow(
  {
    name: 'generateQuizFlow',
    inputSchema: GenerateQuizInputSchema,
    outputSchema: GenerateQuizOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
