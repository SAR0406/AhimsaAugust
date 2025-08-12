"use server";

import { askAboutIndependenceDay } from "@/ai/flows/ask-about-independence-day";
import { z } from "zod";

const FormSchema = z.object({
  question: z.string().trim().min(10, { message: "Please enter a question with at least 10 characters." }),
});

export type State = {
  message?: string | null;
  answer?: string | null;
  errors?: {
    question?: string[];
  };
};

export async function askQuestion(prevState: State, formData: FormData): Promise<State> {
  const validatedFields = FormSchema.safeParse({
    question: formData.get("question"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation failed. Please enter a valid question.",
    };
  }

  try {
    const result = await askAboutIndependenceDay({
      question: validatedFields.data.question,
    });
    
    if (result.answer) {
      return { message: "Answer generated successfully!", answer: result.answer };
    } else {
      return { message: "The AI could not generate an answer to your question. Please try rephrasing it." };
    }
  } catch (error) {
    console.error("Story narrator failed:", error);
    return { message: "An unexpected error occurred while getting the answer. Please try again later." };
  }
}
