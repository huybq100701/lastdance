import { redirect } from "next/navigation";

import { fetchUser, fetchUserPosts } from "@/lib/actions/user.actions";

import ThreadCard from "../cards/ThreadCard";
import { getReactionsData } from "@/lib/actions/thread.actions";
import { currentUser } from "@clerk/nextjs";

interface Result {
  name: string;
  image: string;
  id: string;
  threads: {
    _id: string;
    title: string;
    imageUpload: string;
    text: string;
    parentId: string | null;
    author: {
      name: string;
      image: string;
      id: string;
    };
    createdAt: string;
    children: {
      author: {
        image: string;
      };
    }[];
  }[];
}

interface Props {
  currentUserId: string;
  accountId: string;
  accountType: string;
}

async function ThreadsTab({ currentUserId, accountId, accountType }: Props) {
  let result: Result;

  if (accountType !== "User") {
    // result = await fetchUserPosts(accountId);
  } else {
    result = await fetchUserPosts(accountId);
  }

  if (!result) {
    redirect("/");
  }

  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const reactionsData = await getReactionsData({
    userId: userInfo._id,
    posts: result.threads,
  });

  const { childrenReactions, childrenReactionState } = reactionsData;

  return (
    <section className="mt-9 flex flex-col gap-10">
    {result.threads.map((thread, idx) => (
      <ThreadCard
        key={thread._id}
        id={thread._id}
        currentUserId={currentUserId}
        parentId={thread.parentId}
        title= {thread.title}
        imageUpload = {thread.imageUpload}
        content={thread.text}
        author={
          accountType === "User"
            ? { name: result.name, image: result.image, id: result.id }
            : {
                name: thread.author.name,
                image: thread.author.image,
                id: thread.author.id,
              }
        }
        createdAt={thread.createdAt}
        comments={thread.children}
        reactions={childrenReactions[idx].users}
        reactState={childrenReactionState[idx]}
      />
    ))}
  </section>
  );
}

export default ThreadsTab;
