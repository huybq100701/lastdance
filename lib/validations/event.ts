import * as z from "zod";

const EventValidation = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  location: z.string().min(1, { message: "Location is required" }),
  eventTime: z.string().regex(
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/,
    { message: "Invalid date format" }
  ),
  description: z.string().min(1, { message: "Description is required" }),
});

export default EventValidation;
