// "use client";

// import Image from "next/image";
// import { usePathname, useRouter } from "next/navigation";

// import { deleteEvent } from "@/lib/actions/event.actions";

// interface Props {
//   threadId: string;
//   currentUserId: string;
//   authorId: string;
//   parentId: string | null;
//   isComment?: boolean;
// }

// function DeleteEvent({
//   threadId,
//   currentUserId,
//   authorId,
//   parentId,
//   isComment,
// }: Props) {
//   const pathname = usePathname();
//   const router = useRouter();

//   if (currentUserId !== authorId) return null;

//   const handleClick = async () => {
//     await deleteEvent(JSON.parse(threadId), pathname);
//     if (!parentId || !isComment) {
//       router.push("/");
//     }
//   };
//   return (
//     <Image
//       src="/assets/delete.svg"
//       alt="delte"
//       width={18}
//       height={18}
//       className="cursor-pointer object-contain"
//       onClick={handleClick}
//     />
//   );
// }

// export default DeleteEvent;
