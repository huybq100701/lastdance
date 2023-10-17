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

async function Page({ params }: { params: { id: string } }) {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(params.id);
  console.log('Fetched user information:', userInfo); 
  if (!userInfo?.onboarded) redirect("/onboarding");

  return (
    <section>
      <EventThread  />

    </section>
  );
}
export default Page;
