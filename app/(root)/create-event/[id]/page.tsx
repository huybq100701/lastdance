import Image from "next/image";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { profileTabs } from "@/constants";

import ThreadsTab from "@/components/shared/ThreadsTab";
import ProfileHeader from "@/components/shared/ProfileHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  fetchUser,
  fetchUsersByField,
  isUserFollowing,
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
      <EventThread currentUserId={user.id} currentUserInfo={user.username} opponentId={userInfo.id} opponentInfo ={userInfo.username} />
    </section>
  );
}
export default Page;
