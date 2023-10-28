import * as z from "zod";


export const EventValidation = z.object({
  event: z.string().nonempty().min(3, { message: "Minimum 3 characters." }),
  authorId: z.string(),
  opponentId: z.string(),
});
