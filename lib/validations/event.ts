import * as z from "zod";

export const EventValidation = z.object({
  title: z.string(),
  location: z.string(),
  eventTime: z.string(), 
  description: z.string(),
  opponentId: z.string(),
  currentUserId: z.string(),
});

