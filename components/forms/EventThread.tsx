"use client"

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router"; // import useRouter từ next/router
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createEvent, editEvent } from "@/lib/actions/event.actions";
import EventValidation from "@/lib/validations/event";

interface EventThreadProps {
  userId: string;
  eventId?: string;
  opponentId: string; 
}

const EventThread: React.FC<EventThreadProps> = ({ userId, eventId, opponentId }) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof EventValidation>>({
    resolver: zodResolver(EventValidation),
    defaultValues: {
      title: "",
      location: "",
      eventTime: "",
      description: "",
      // opponentId: opponentId, 
      // currentUserId: userId,
    },
  });

  const onSubmit = async (values: z.infer<typeof EventValidation>) => {
    if (eventId) {
      // await editEvent({
      //   eventId: eventId,
      //   title: values.title,
      //   location: values.location,
      //   eventTime: values.eventTime,
      //   description: values.description,
      //   path: router.asPath, // sử dụng router.asPath thay vì pathname
      // });
    // } else {
    //   await createEvent({
    //     title: values.title,
    //     location: values.location,
    //     currentUserId: userId,
    //     opponentId: opponentId, 
    //     eventTime: values.eventTime,
    //     description: values.description,
    //     path: router.asPath, 
    //   });
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
          name="eventTime"
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

        <Button type="submit" className="bg-primary-500">
          {eventId ? "Edit" : "Create"} Event Thread
        </Button>
      </form>
    </Form>
  );
}

export default EventThread;
