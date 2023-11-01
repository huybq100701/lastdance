import { redirect } from "next/navigation";
import { fetchUser, fetchUserEvents } from "@/lib/actions/user.actions";
import EventCard from "../cards/EventCard";
import { currentUser } from "@clerk/nextjs";
import PostEvent from "@/components/forms/PostEvent";

interface Event {
  _id: string;
  title: string;
  time: string;
  location: string;
  description: string;
  author: {
    name: string;
    image: string;
    id: string;
  };
  opponent: {
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
}

interface Result {
  name: string;
  image: string;
  id: string;
  events: Event[];
}

interface Props {
  currentUserId: string;
  accountId: string;
  accountType: string;
}

async function EventTab({ currentUserId, accountId , accountType }: Props) {
  let result: Result;

  if (accountType === "User") {
    result = await fetchUserEvents(accountId);
  } else {
    result = await fetchUserEvents(accountId);
  }

  if (!result) {
    redirect("/");
  }
  console.log(result.events)
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) {
    redirect("/onboarding");
  }

  result.events.sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return dateB.getTime() - dateA.getTime();
  });
  
  return (
    <section className="mt-9 flex flex-col gap-10">
      {result.events.map((event) => (
        <EventCard
          key={event._id}
          id={event._id}
          currentUserId={currentUserId}
          title={event.title}
          location={event.location}
          time={event.time}
          description={event.description}
          author={
            accountType === "User"
              ? { name: result.name, image: result.image, id: result.id }
              : { name: event.author.name, image: event.author.image, id: event.author.id }
          }
          opponent={
            accountType === "User"
              ? { name: result.name, image: result.image, id: result.id }
              : { name: event.opponent.name, image: event.opponent.image, id: event.opponent.id }
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
