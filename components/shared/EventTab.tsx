import { redirect } from "next/navigation";
import { fetchUser, fetchUserEvents } from "@/lib/actions/user.actions";
import EventCard from "../cards/EventCard";
import { currentUser } from "@clerk/nextjs";
import PostEvent from "@/components/forms/PostEvent";

interface Event {
  _id: string;
  text: string;
  author: {
    id: string;
    name: string;
    image: string;
  }
  community: {
    id: string;
    name: string;
    image: string;
  } | null;
  createdAt: string;
}

interface Props {
  currentUserId: string;
  authorId: string;
  accountType: string;
}

async function EventTab({ currentUserId, authorId, accountType }: Props) {
  try {
    let events: Event[] = [];

    if (accountType === "User") {
      events = await fetchUserEvents(authorId);
    } else {
      redirect("/");
    }

    if (!events) {
      redirect("/");
    }
    const user = await currentUser();
    if (!user) return null;

    const userInfo = await fetchUser(user.id);
    if (!userInfo?.onboarded) redirect("/onboarding");
    
    return (
      <section className="mt-9 flex flex-col gap-10">
        <PostEvent
          authorId={userInfo._id}
          opponentId={userInfo.opponent} 
        />
        {events.map((event) => (
          <EventCard
            key={event._id}
            id={event._id}
            text={event.text}
            author={event.author}
            community={event.community}
            createdAt={event.createdAt}
          />
        ))}
      </section>
    );
  } catch (error) {
    console.error("Error in EventTab:", error);
    throw error;
  }
}

export default EventTab;
