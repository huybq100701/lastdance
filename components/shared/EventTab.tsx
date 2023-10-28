import { redirect } from "next/navigation";
import { fetchUser, fetchUserEvents } from "@/lib/actions/user.actions";
import EventCard from "../cards/EventCard";
import { currentUser } from "@clerk/nextjs";
import PostEvent from "@/components/forms/PostEvent";

interface Result {
  name: string;
  image: string;
  id: string;
  events: {
    _id: string;
    text: string;
    author: {
      name: string;
      image: string;
      id: string;
    };
    community: {
      id: string;
      name: string;
      image: string;
    } | null;
    createdAt: string;
  }[];
}

interface Props {
  currentUserId: string;
  authorId: string;
  accountType: string;
}

async function EventTab({ currentUserId, authorId, accountType }: Props) {
  let result: Result;

  if (accountType === "User") {

    result = await fetchUserEvents(authorId);
  } else {
    result = await fetchUserEvents(authorId);
  }

  if (!result) {
    redirect("/");
  }

  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  return (
    <section className="mt-9 flex flex-col gap-10">
      {result.events.map((event) => (
        <EventCard
          key={event._id}
          id={event._id}
          text={event.text}
          author={
            accountType === "User"
              ? { name: result.name, image: result.image, id: result.id }
              : {
                  name: event.author.name,
                  image: event.author.image,
                  id: event.author.id,
                }
          }
          community={
            accountType === "Community"
              ? { name: result.name, id: result.id, image: result.image }
              : event.community
          }
          createdAt={event.createdAt}
        />
      ))}
    </section>
  );
}

export default EventTab;
