import { redirect } from "next/navigation";
import EventThread from "@/components/forms/EventThread";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";


async function Page({ userId, opponentId }) {

  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  return (
    <>
      <h1 className="head-text">Create Event</h1>
      <EventThread userId={userId} opponentId={opponentId} />
    </>
  );
}


export default Page;
