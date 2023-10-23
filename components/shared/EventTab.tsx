import { redirect } from "next/navigation";
import { fetchUserEvents } from "@/lib/actions/user.actions"; // Đảm bảo rằng bạn đã import fetchUserEvents từ thư viện user.actions

import EventCard from "../cards/EventCard"; // Đảm bảo rằng bạn đã import EventCard hoặc tạo một component tương tự

interface EventData {
  _id: string;
  title: string;
  location: string;
  eventTime: string;
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
  createdAt: string;
}

interface Props {
  currentUserId: string;
  accountId: string;
  accountType: string;
}

async function EventTab({ currentUserId, accountId, accountType }: Props) {
  let events: EventData[];

  // Thay thế "fetchUserEvents" bằng hàm tải dữ liệu sự kiện thích hợp từ user.actions
  events = await fetchUserEvents(accountId);

  if (!events) {
    redirect("/");
  }

  // Thêm phần mã để lấy thông tin user và kiểm tra onboarded tại đây (tương tự như trong ThreadsTab)

  return (
    <section className="mt-9 flex flex-col gap-10">
      {events.map((event) => (
        <EventCard
          key={event._id}
          id={event._id}
          currentUserId={currentUserId}
          title={event.title}
          location={event.location}
          eventTime={event.eventTime}
          description={event.description}
          author={{
            name: event.author.name,
            image: event.author.image,
            id: event.author.id,
          }}
          opponent={{
            name: event.opponent.name,
            image: event.opponent.image,
            id: event.opponent.id,
          }}
          createdAt={event.createdAt}
        />
      ))}
    </section>
  );
}

export default EventTab;
