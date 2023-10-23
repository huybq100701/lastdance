"use client"
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createEvent, editEvent } from "@/lib/actions/event.actions";
import EventValidation from "@/lib/validations/event";

interface EventThreadProps {
  authorId: string;
  opponentId: string;
  eventId?: string;
  eventTitle?: string;
  eventLocation?: string;
  eventTime?: string;
  eventDescription?: string;
}

function EventThread({ authorId, opponentId, eventId, eventTitle, eventLocation, eventTime, eventDescription }: EventThreadProps) {
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm<z.infer<typeof EventValidation>>({
    resolver: zodResolver(EventValidation),
    defaultValues: {
      title: eventTitle || '',
      location: eventLocation || '',
      eventTime: eventTime || '',
      description: eventDescription || '',
    },
  });
  console.log(eventTitle)
  const onSubmit = async (values: z.infer<typeof EventValidation>) => {
    // try {
      if (eventId) {
      //   await editEvent({
      //     eventId: eventId,
      //     title: values.title,
      //     location: values.location,
      //     eventTime: new Date(values.eventTime),
      //     description: values.description,
      //     path: pathname,
      //   });
      // } else {
        await createEvent({
          title: values.title,
          location: values.location,
          currentUserId: authorId,
          opponentId: opponentId,
          eventTime: new Date(values.eventTime),
          description: values.description,
          path: pathname,
        });
      // }

      router.push('/');

    // } catch (error) {
    //   console.error('Error occurred during form submission:', error);
    }
  };

  return (
    <Form {...form}>
        <div className="text-base-semibold text-light-2">Opponent: {opponentId}</div>
      <div className="text-base-semibold text-light-2">Author: {authorId} </div>
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

        <Button type="submit" className="bg-lime-500">
          {eventId ? "Edit" : "Create"} Event
        </Button>
      </form>
    </Form>
  );
}

export default EventThread;
