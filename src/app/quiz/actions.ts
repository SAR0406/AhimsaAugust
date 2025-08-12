"use server";

import { z } from "zod";
import { generateQuiz } from "@/ai/flows/generate-quiz";
import { verifyQuizAnswer } from "@/ai/flows/verify-quiz-answer";
import type { Question } from "@/lib/types";

// Generate Quiz Action
const GenerateFormSchema = z.object({
  userClass: z.string().min(1, { message: "Please select your class or grade." }),
  difficulty: z.string().min(1, { message: "Please select a difficulty level." }),
  numQuestions: z.coerce
    .number()
    .int()
    .min(1, { message: "Please enter a number of at least 1." })
    .max(10, { message: "The maximum number of questions is 10." }),
});

export type GenerateState = {
  message?: string | null;
  questions?: Question[] | null;
  errors?: {
    userClass?: string[];
    difficulty?: string[];
    numQuestions?: string[];
  };
};

export async function generateQuizAction(prevState: GenerateState, formData: FormData): Promise<GenerateState> {
  const validatedFields = GenerateFormSchema.safeParse({
    userClass: formData.get("userClass"),
    difficulty: formData.get("difficulty"),
    numQuestions: formData.get("numQuestions"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation failed. Please check the form fields.",
    };
  }

  try {
    const result = await generateQuiz(validatedFields.data);
    if (result.questions && result.questions.length > 0) {
      return { message: "Quiz generated successfully!", questions: result.questions };
    } else {
      return { message: "The AI could not generate a quiz with the selected options. Please try again." };
    }
  } catch (error) {
    console.error("Quiz generation failed:", error);
    return { message: "An unexpected error occurred while generating the quiz. Please try again later." };
  }
}

// Verify Answer Action
const VerifyFormSchema = z.object({
    question: z.string().min(1),
    options: z.string().transform(val => val.split(',')),
    providedAnswer: z.string().min(1),
    userSuggestedAnswer: z.string().min(1),
});


export type VerifyState = {
  message?: string | null;
  data?: {
    isProvidedAnswerCorrect: boolean;
    correctAnswer: string;
    explanation: string;
  } | null;
  errors?: {
    general?: string[];
  };
};

export async function verifyAnswerAction(prevState: VerifyState, formData: FormData): Promise<VerifyState> {
    const validatedFields = VerifyFormSchema.safeParse({
        question: formData.get("question"),
        options: formData.get("options"),
        providedAnswer: formData.get("providedAnswer"),
        userSuggestedAnswer: formData.get("userSuggestedAnswer"),
    });

    if (!validatedFields.success) {
        return {
            errors: { general: ["Invalid data provided for verification."] },
            message: "Invalid data.",
        };
    }

    try {
        const result = await verifyQuizAnswer(validatedFields.data);
        if (result) {
            return {
                message: "Successfully verified answer.",
                data: result,
            };
        } else {
            return { message: "The AI could not verify the answer at this time." };
        }
    } catch (error) {
        console.error("Answer verification failed:", error);
        return { message: "An unexpected error occurred during verification." };
    }
}
