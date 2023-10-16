"use client"
import React, { useEffect, useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { EventValidation } from "@/lib/validations/event";
import UserCard from "../cards/UserCard";

interface Props {
  userId: string;
  eventId?: string;
  eventText?: string;
  opponentId: string;
}

function EventThread({ userId, eventId, eventText, opponentId }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const [selectedUser, setSelectedUser] = useState<string>("");

  const form = useForm<z.infer<typeof EventValidation>>({
    resolver: zodResolver(EventValidation),
    defaultValues: {
      title: eventText || "",
      location: "",
      eventTime: new Date().toISOString().substring(0, 16),
      description: "",
      opponentId: opponentId,
      currentUserId: userId,
    },
  });

  const onSubmit = async (values: z.infer<typeof EventValidation>) => {
    try {
      if (eventId && eventText) {
        await editEvent({
          eventId: eventId,
          title: values.title,
          location: values.location,
          eventTime: new Date(values.eventTime),
          description: values.description,
          path: pathname,
        });
      } else {
        await createEvent({
          title: values.title,
          location: values.location,
          currentUserId: userId,
          opponentId: values.opponentId,
          eventTime: new Date(values.eventTime),
          description: values.description,
          path: pathname,
        });
      }

      router.push("/");
    } catch (error) {
      console.error("Lỗi khi tạo hoặc chỉnh sửa sự kiện:", error);
    }
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
                Tiêu đề
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
                Đối thủ
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
          name="location"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="text-base-semibold text-light-2">
                Địa điểm
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
                Thời gian sự kiện
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
                Mô tả
              </FormLabel>
              <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                <Textarea rows={5} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="bg-primary-500">
          {eventId ? "Chỉnh sửa" : "Tạo"} Sự kiện
        </Button>
      </form>
    </Form>
  );
}

export default EventThread;
