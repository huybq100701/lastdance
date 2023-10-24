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
  userId: string;
  eventId?: string;
  threadTitle?: string;
  threadLocation?: string;
  threadTime?: string;
  opponentId?: string;
  userName? : string;
  opponentName? : string;
  threadDescription?: string;
}

function PostEvent({ userId, eventId, threadTitle, opponentId, userName, opponentName,threadLocation, threadTime,threadDescription }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const { organization } = useOrganization();

  const form = useForm<z.infer<typeof EventValidation>>({
    resolver: zodResolver(EventValidation),
    defaultValues: {
      title: threadTitle || "",
      accountId: userId,
      opponentId: opponentId,
      location: threadLocation || "",
      time: threadTime || "",
      description: threadDescription || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof EventValidation>) => {
    if (eventId && threadTitle) {
      await editEvent({
        eventId,
        title: values.title,
        location: values.location,
        time: values.time,
        description: values.description,
        path: pathname,
      });
    } else {
      await createEvent({
        author: userId,
        authorName: userName,
        opponent: opponentId,
        opponentName: opponentName,
        title: values.title,
        location: values.location,
        time: values.time,
        description: values.description,
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
                OpponentID : {opponentName}
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
          name="accountId"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="text-base-semibold text-light-2">
                AuthorID : {userName}
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
          name="title"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="text-base-semibold text-light-2">
                Title
              </FormLabel>
              <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                <Textarea rows={5} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="text-base-semibold text-light-2">
                Location
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
          name="time"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="text-base-semibold text-light-2">
                Event Time
              </FormLabel>
              <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                <input type="datetime-local" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
          <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="text-base-semibold text-light-2">
                Description
              </FormLabel>
              <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                <Textarea rows={5} {...field} />
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
