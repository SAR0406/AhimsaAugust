'use server';

/**
 * @fileOverview An AI agent that generates a quote for an image.
 *
 * - generateQuoteFromImage - A function that handles the quote generation process.
 * - GenerateQuoteFromImageInput - The input type for the function.
 * - GenerateQuoteFromImageOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateQuoteFromImageInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type GenerateQuoteFromImageInput = z.infer<typeof GenerateQuoteFromImageInputSchema>;

const GenerateQuoteFromImageOutputSchema = z.object({
  quote: z.string().describe("The AI-generated quote or caption for the image."),
});
export type GenerateQuoteFromImageOutput = z.infer<typeof GenerateQuoteFromImageOutputSchema>;

export async function generateQuoteFromImage(
  input: GenerateQuoteFromImageInput
): Promise<GenerateQuoteFromImageOutput> {
  return generateQuoteFromImageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateQuoteFromImagePrompt',
  input: {schema: GenerateQuoteFromImageInputSchema},
  output: {schema: GenerateQuoteFromImageOutputSchema},
  prompt: `You are an expert at writing inspiring and patriotic captions. Analyze the provided image and generate a short, powerful quote or caption related to India's Independence Day that would be suitable for sharing on social media. The caption should be respectful, evocative, and capture the spirit of freedom, unity, or the essence of the image.

Image: {{media url=photoDataUri}}`,
});

const generateQuoteFromImageFlow = ai.defineFlow(
  {
    name: 'generateQuoteFromImageFlow',
    inputSchema: GenerateQuoteFromImageInputSchema,
    outputSchema: GenerateQuoteFromImageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
