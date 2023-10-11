"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useOrganization } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { ThreadValidation } from "@/lib/validations/thread";
import { createThread, editThread } from "@/lib/actions/thread.actions";

interface Props {
  userId: string;
  threadId?: string;
  threadText?: string;
  threadTitle?: string;
  threadImageUpload?: string;
}

function PostThread({
  userId,
  threadId,
  threadText,
  threadTitle,
  threadImageUpload,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const { organization } = useOrganization();

  const form = useForm<z.infer<typeof ThreadValidation>>({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
      title: threadTitle || "",
      imageUpload: threadImageUpload || "",
      thread: threadText || "",
      accountId: userId,
    },
  });

  const onImageUploadChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files[0];
    if (file) {
      const imageUpload = URL.createObjectURL(file);
      form.setValue("imageUpload", imageUpload);
    }
  };

  const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
    if (threadId && threadText) {
      await editThread({
        threadId,
        text: values.thread,
        path: pathname,
      });
    } else {
      await createThread({
        text: values.thread,
        title: values.title,
        imageUpload: values.imageUpload,
        author: userId,
        path: pathname,
      });
    }

    router.push("/");
  };

  return (
    <Form {...form}>
      <form
        className="mt-10 flex flex-col justify-start gap-10"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="text-base-semibold text-light-2">
                Title
              </FormLabel>
              <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                <input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imageUpload"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="text-base-semibold text-light-2">
                Image Upload (URL)
              </FormLabel>
              <input
                type="file"
                accept="image/*"
                onChange={onImageUploadChange}
              />
              {form.getValues().imageUpload && (
                <img
                  src={form.getValues().imageUpload}
                  alt="Uploaded Image"
                  width={100}
                  height={100}
                />
              )}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="text-base-semibold text-light-2">
                Content
              </FormLabel>
              <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                <Textarea rows={15} {...field} />
              </FormControl>
              <FormMessage />
             
            </FormItem>
          )}
        />

        <Button type="submit" className="bg-lime-500">
          {threadId ? "Edit" : "Create"} Thread
        </Button>
      </form>
    </Form>
  );
}

export default PostThread;
