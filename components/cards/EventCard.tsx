import Image from "next/image";
import Link from "next/link";
import { formatDateString } from "@/lib/utils";
import EditEvent from "../atoms/EditEvent";
import DeleteEvent from "../forms/DeleteEvent";

interface Props {
  id: string;
  title: string;
  time: string;
  location: string;
  description: string;
  currentUserId: string;
  author: {
    id: string;
    name: string;
    image: string;
  };
  opponent:{
    id: string;
    name: string;
    image: string;
  },
  community: {
    id: string;
    name: string;
    image: string;
  } | null;
  createdAt: string;
}

function EventCard({
  id,
  title,
  time,
  location,
  description,
  currentUserId,
  author,
  opponent,
  community,
  createdAt,
}: Props) {
  // const { id: authorId, name: authorName, image: authorImage } = author;
  // const { id: opponentId, name: opponentName, image: opponentImage } = opponent;
  // const { id: communityId, name: communityName, image: communityImage } = community || {};
  console.log("opponent", opponent)
  console.log('author',author)
  return (
    <div className="border border-gray-300 p-4 rounded-md shadow-md">
      <div className="flex flex-row gap-10">
        <div className="flex flex-col">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <Link href={`/profile/${author.id}`} className="relative h-10 w-10">
                <Image
                  src={author.image}
                  alt="Profile image"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </Link>
            </div>
            <div>
              <div className="text-sm font-medium text-white-900">{author.name}</div>
              <div className="text-sm text-gray-500">{formatDateString(createdAt)}</div>
            </div>
          </div>
          <div className="text-sm font-medium text-white-900">Opponent: </div>
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <Link href={`/profile/${opponent.id}`} className="relative h-10 w-10">
                <Image
                  src={opponent.image}
                  alt="Profile image"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </Link>
            </div>
            <div>
              <div className="text-sm font-medium text-white-900">{opponent.name}</div>
             
            </div>
          </div>
          <div className="mt-2 text-white-700">Title: {title}</div>
          <div className="mt-2 text-white-700">Location: {location}</div>
          <div className="mt-2 text-white-500">Description: {description}</div>
          <div className="mt-2 text-gray-500">{time}</div>
          <div className="flex flex-row gap-2 mt-4">
            <DeleteEvent
              eventId={JSON.stringify(id)}
              currentUserId={currentUserId}
              authorId={author.id}
              opponentId={opponent.id}
            />
            <EditEvent
              eventId={JSON.stringify(id)}
              currentUserId={currentUserId}
              authorId={author.id}
            />
          </div>
        </div>
        {community && (
          <div className="mt-4 flex items-center">
            <Link href={`/communities/${community.id}`} className="flex items-center">
              <Image
                src={community.image}
                alt={community.name}
                width={16}
                height={16}
                className="rounded-full"
              />
              <span className="ml-2 text-sm text-gray-500">{community.name}</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default EventCard;
