"use client"

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createEvent, editEvent } from "@/lib/actions/event.actions";
import EventValidation from "@/lib/validations/event";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchUser } from "@/lib/actions/user.actions";

interface EventThreadProps {
  userId: string;
  eventId?: string;
  opponentId: string;
  opponentInfo: {
    name: string;
  };
}

const EventThread: React.FC<EventThreadProps> = ({ userId, eventId, opponentId, opponentInfo}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await fetchUser(opponentId); 
        setUserInfo(userData);
        console.log("information :" , opponentId)
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [userId]);

  const form = useForm<z.infer<typeof EventValidation>>({
    resolver: zodResolver(EventValidation),
    defaultValues: {
      title: "",
      location: "",
      eventTime: "",
      description: "",
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
       <div>
       <FormLabel className="text-base-semibold text-light-2">
          Opponent Information : {opponentInfo}
        </FormLabel>
        </div>
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