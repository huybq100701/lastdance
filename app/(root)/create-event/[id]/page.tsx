import Image from "next/image";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import {
  fetchUser,
} from "@/lib/actions/user.actions";
import UserCard from "@/components/cards/UserCard";
import EventThread from "@/components/forms/EventThread";
import Event from "@/lib/models/event.model";

async function Page({ params }: { params: { id: string } }) {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(params.id);

  if (!userInfo?.onboarded) redirect("/onboarding");

  return (
    <section>
     <EventThread opponentId={userInfo._id} authorId={user.id} />
    </section>
  );
}
export default Page;
