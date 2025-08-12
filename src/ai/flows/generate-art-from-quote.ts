
'use server';

/**
 * @fileOverview An AI agent that generates art from a famous quote.
 *
 * - generateArtFromQuote - A function that handles the art generation process.
 * - GenerateArtFromQuoteInput - The input type for the function.
 * - GenerateArtFromQuoteOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateArtFromQuoteInputSchema = z.object({
  quote: z.string().describe("A famous quote about India's Independence Day."),
});
export type GenerateArtFromQuoteInput = z.infer<typeof GenerateArtFromQuoteInputSchema>;

const GenerateArtFromQuoteOutputSchema = z.object({
  imageUrl: z
    .string()
    .describe(
      "The generated image as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type GenerateArtFromQuoteOutput = z.infer<typeof GenerateArtFromQuoteOutputSchema>;

export async function generateArtFromQuote(
  input: GenerateArtFromQuoteInput
): Promise<GenerateArtFromQuoteOutput> {
  return generateArtFromQuoteFlow(input);
}

const generateArtFromQuoteFlow = ai.defineFlow(
  {
    name: 'generateArtFromQuoteFlow',
    inputSchema: GenerateArtFromQuoteInputSchema,
    outputSchema: GenerateArtFromQuoteOutputSchema,
  },
  async input => {
    const {media} = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: [
        {text: `Generate a symbolic and artistic image inspired by the following quote related to India's Independence Day: "${input.quote}". The style should be evocative, patriotic, and respectful. Focus on symbols of freedom, sacrifice, and hope like the tricolor, doves, light, or abstract representations of struggle and unity. Do not include any text in the image.`}
      ],
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });

    if (!media?.url) {
      throw new Error('Image generation failed.');
    }

    return {
      imageUrl: media.url,
    };
  }
);
