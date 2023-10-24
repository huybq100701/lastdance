import * as z from "zod";

export const EventValidation = z.object({
  title: z.string().nonempty().min(3, { message: "Minimum 3 characters." }),
  accountId: z.string(),
  opponentId: z.string(),
  location: z.string(),
  time: z.string().regex(
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/,
    { message: "Invalid date format. Expected format: YYYY-MM-DDTHH:mm" }
  ),
  description: z.string(),

});

export default EventValidation;
