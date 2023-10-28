import Image from "next/image";
import Link from "next/link";
import { formatDateString } from "@/lib/utils";

interface Props {
  id: string;
  title: string;
  time: string;
  location: string;
  description: string;
  author: {
    id: string;
    name: string;
    image: string;
  };
  community: {
    id: string;
    name: string;
    image: string;
  } | null;
  createdAt: string;
}

function EventCard({ id, title,time, location, description, author, community, createdAt }: Props) {
  return (
    <div className="border border-gray-300 p-4 rounded-md shadow-md">
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
      <div className="mt-2 text-white-700">{title}</div>
      <div className="mt-2 text-white-700">{location}</div>
      <div className="mt-2 text-white-700">{time}</div>
      <div className="mt-2 text-white-700">{description}</div>
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
  );
}

export default EventCard;
