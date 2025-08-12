
"use server";

import { generateArtFromQuote } from "@/ai/flows/generate-art-from-quote";
import { z } from "zod";

const FormSchema = z.object({
  quote: z.string().trim().min(1, { message: "Please select a quote to generate art." }),
});

export type State = {
  message?: string | null;
  imageUrl?: string | null;
  errors?: {
    quote?: string[];
  };
};

export async function createArt(prevState: State, formData: FormData): Promise<State> {
  const validatedFields = FormSchema.safeParse({
    quote: formData.get("quote"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation failed. Please select a quote.",
    };
  }

  try {
    const result = await generateArtFromQuote({
      quote: validatedFields.data.quote,
    });
    
    if (result.imageUrl) {
      return { message: "Art generated successfully!", imageUrl: result.imageUrl };
    } else {
      return { message: "The AI was unable to generate art for this quote. Please try another one." };
    }
  } catch (error) {
    console.error("Art generation failed:", error);
    return { message: "An unexpected error occurred while generating the art. Please try again later." };
  }
}
