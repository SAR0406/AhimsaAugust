"use server";

import { generateQuoteFromImage } from "@/ai/flows/generate-quote-from-image";
import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const FormSchema = z.object({
  image: z
    .any()
    .refine((file) => file && file.size > 0, "Please select an image file.")
    .refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
});

export type State = {
  message?: string | null;
  quote?: string | null;
  errors?: {
    image?: string[];
  };
};

// Helper function to convert a File to a Base64 Data URI
async function fileToDataURI(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  return `data:${file.type};base64,${buffer.toString("base64")}`;
}

export async function createQuote(prevState: State, formData: FormData): Promise<State> {
  const imageFile = formData.get("image");
  
  const validatedFields = FormSchema.safeParse({
    image: imageFile,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Invalid image file. Please check the requirements.",
    };
  }
  
  try {
    const photoDataUri = await fileToDataURI(validatedFields.data.image as File);
    
    const result = await generateQuoteFromImage({
      photoDataUri,
    });
    
    if (result.quote) {
      return { message: "Quote generated successfully!", quote: result.quote };
    } else {
      return { message: "The AI could not generate a quote for this image." };
    }
  } catch (error) {
    console.error("Quote generation failed:", error);
    return { message: "An unexpected error occurred while generating the quote. Please try again later." };
  }
}
