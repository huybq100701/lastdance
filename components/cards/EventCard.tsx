import Image from "next/image";
import Link from "next/link";
import { formatDateString } from "@/lib/utils";

interface Props {
  id: string;
  text: string;
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

function EventCard({ id, text, author, community, createdAt }: Props) {
  return (
    <div className="border border-gray-300 p-4 rounded-md">
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
          <div className="text-sm font-medium text-gray-900">{author.name}</div>
          <div className="text-sm text-gray-500">{formatDateString(createdAt)}</div>
        </div>
      </div>
      <div className="mt-2 text-gray-700">{text}</div>
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
