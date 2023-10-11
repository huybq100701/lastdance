import * as z from "zod";

export const ThreadValidation = z.object({
  title:z.string().nonempty().min(1, { message: "Minimum 1 characters." }),
  thread: z.string().nonempty().min(3, { message: "Minimum 3 characters." }),
  imageUpload: z.string().nonempty(),
  accountId: z.string(),
});

export const CommentValidation = z.object({
  thread: z.string().nonempty().min(3, { message: "Minimum 3 characters." }),
});
