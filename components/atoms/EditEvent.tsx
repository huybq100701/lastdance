import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  eventId: string;
  currentUserId: string;
  authorId: string;
}

const EditEvent = ({ eventId, currentUserId, authorId }: Props) => {
  if (currentUserId !== authorId  ) return null;

  return (
    <Link href={`/edit-event/${JSON.parse(eventId)}`}>
      <div className="cursor-pointer">
        <Image
          src="/assets/edit.svg"
          alt="edit event"
          width={18}
          height={18}
          className="object-contain"
        />
      </div>
    </Link>
  );
};

export default EditEvent;
