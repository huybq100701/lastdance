import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import {
  fetchUser,
} from "@/lib/actions/user.actions";
import EventThread from "@/components/forms/PostEvent";

async function Page({ params }: { params: { id: string } }) {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(params.id);

  if (!userInfo?.onboarded) {
    redirect("/onboarding");
    return null; 
  }

  return (
    <section>
      <h1 className='head-text'>Create Post</h1>
      <EventThread opponentId={userInfo.id} opponentName={userInfo.username} userName={user.username} userId={user.id} />
    </section>
  );
}

export default Page;
