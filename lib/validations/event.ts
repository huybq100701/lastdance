import * as z from "zod";

export const EventValidation = z.object({
    title: z.string().min(1, "Title is required"),
    location: z.string().min(1, "Location is required"),
    description: z.string().optional(),
});

