import * as z from "zod";

export const EventValidation = z.object({
  title: z.string().nonempty().min(3, { message: "Minimum 3 characters." }),
  location: z.string().nonempty().min(3, { message: "Minimum 3 characters." }),
  time: z.date(),
  description: z.string(),
  authorId: z.string(),
  opponentId: z.string(),
  accountId :z.string(),
});
