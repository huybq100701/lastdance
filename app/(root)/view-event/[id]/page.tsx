
import ViewEvent from "@/components/forms/ViewEvent";
import { fetchEventById } from "@/lib/actions/event.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

const Page = async ({ params }: { params: { id: string } }) => {
  if (!params.id) return null;

  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const event = await fetchEventById(params.id);

  return (
    <>
      <h1 className="head-text">Join Team</h1>

      <ViewEvent
        eventId={event.id}
        eventTitle={event.title}
        eventLocation={event.location}
        eventTime={event.time}
        eventDescription={event.description}
      />
    </>
  );
};

export default Page;
