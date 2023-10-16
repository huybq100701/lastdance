"use client"
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { EventValidation } from "@/lib/validations/event";
import Searchbar from "../shared/Searchbar";
import { createEvent, editEvent } from "@/lib/actions/event.actions";

interface Props {
  userId: string;
  threadId?: string;
  threadText?: string;
}

function EventThread({ userId, threadId, threadText }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm<z.infer<typeof EventValidation>>({
    resolver: zodResolver(EventValidation),
    defaultValues: {
      title: threadText || "",
      location: "", 
      eventTime: "", 
      description: "",
      opponentId: "", 
      currentUserId: userId,
    },
  });

  const onSubmit = async (values: z.infer<typeof EventValidation>) => {
    
    // if (threadId && threadText) {
    //   await editEvent({
    //     eventId: threadId,
    //     title: values.title,
    //     location: values.location,
    //     eventTime: values.eventTime,
    //     description: values.description,
    //     path: pathname,
    //   });
    // } else {
      try{
        await createEvent({
          title: values.title,
          location: values.location,
          currentUserId: userId,
          opponentId: values.opponentId,
          eventTime: values.eventTime,
          description: values.description,
          path: pathname,
        });     

    router.push("/");
      }catch (error){
        console.error("Error creating event:" , error)
      }
  };

  return (
    <Form {...form}>
      <form
        className="mt-10 flex flex-col justify-start gap-10"
        // onSubmit={form.handleSubmit(onSubmit)}
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
            name="opponentId"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormLabel className="text-base-semibold text-light-2">
                  Opponent
                </FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
        <Searchbar routeType='create-event' />
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
          {threadId ? "Edit" : "Create"} Event Thread
        </Button>
      </form>
    </Form>
  );
}

export default EventThread;
