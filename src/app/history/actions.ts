
"use server";

import { getMoreInfoAboutHistoryEvent } from "@/ai/flows/get-more-info-about-history-event";
import { z } from "zod";

const FormSchema = z.object({
    year: z.string().trim().min(1, 'Year is required.'),
    title: z.string().trim().min(1, 'Title is required.'),
    description: z.string().trim().min(1, 'Description is required.'),
});

export type State = {
  message?: string | null;
  data?: {
    year: string;
    title: string;
    moreInfo: string;
  } | null;
  errors?: {
    general?: string[];
  };
};

export async function getMoreInfoAction(prevState: State, formData: FormData): Promise<State> {
    const validatedFields = FormSchema.safeParse({
        year: formData.get("year"),
        title: formData.get("title"),
        description: formData.get("description"),
    });

    if (!validatedFields.success) {
        return {
            errors: { general: ["Invalid data provided. Please try again."] },
            message: "Validation failed. Required fields are missing.",
        };
    }

    try {
        const result = await getMoreInfoAboutHistoryEvent(validatedFields.data);
        if (result.moreInfo) {
            return {
                message: "Successfully fetched more information.",
                data: { ...validatedFields.data, moreInfo: result.moreInfo },
            };
        } else {
            return { message: "The AI could not provide more information for this event." };
        }
    } catch (error) {
        console.error("Failed to get more info:", error);
        return { message: "An unexpected error occurred while fetching details. Please try again later." };
    }
}
