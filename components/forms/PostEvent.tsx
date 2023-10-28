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

import { EventValidation } from "@/lib/validations/event";
import { createEvent, editEvent } from "@/lib/actions/event.actions";

interface Props {
  authorId: string;
  opponentId: string;
  eventId?: string;
  eventText?: string;
}

function PostEvent({ authorId, opponentId, eventId, eventText }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const { organization } = useOrganization();

  const form = useForm<z.infer<typeof EventValidation>>({
    resolver: zodResolver(EventValidation),
    defaultValues: {
      event: eventText || "",
      authorId: authorId,
      opponentId: opponentId,
    },
  });

  const onSubmit = async (values: z.infer<typeof EventValidation>) => {
    if (eventId && eventText) {
      await editEvent({
        eventId,
        text: values.event,
        path: pathname,
      });
    } else {
      await createEvent({
        text: values.event,
        author: authorId,
        opponent: opponentId,
        communityId: organization ? organization.id : null,
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
          name="opponentId"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="text-base-semibold text-light-2">
                OpponentID 
              </FormLabel>
              <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                <input type="text" {...field} readOnly  />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="authorId"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="text-base-semibold text-light-2">
                AuthorID 
              </FormLabel>
              <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                <input type="text" {...field} readOnly  />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="event"
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
          {eventId ? "Edit" : "Create"} Event
        </Button>
      </form>
    </Form>
  );
}

export default PostEvent;
