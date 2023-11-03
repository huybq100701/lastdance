import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";

import Comment from "@/components/forms/Comment";
import ThreadCard from "@/components/cards/ThreadCard";

import { fetchUser } from "@/lib/actions/user.actions";
import {
  fetchThreadById,
  getReactionsData,
} from "@/lib/actions/post.actions";

async function Page({ params }: { params: { id: string } }) {
  if (!params.id) return null;

  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const post = await fetchThreadById(params.id);

  const reactionsData = await getReactionsData({
    userId: userInfo._id,
    posts: post.children,
    parentId: post._id,
  });

  const {
    parentReactions,
    parentReactionState,
    childrenReactions,
    childrenReactionState,
  } = reactionsData;

  return (
    <section className="relative">
      <div>
        <ThreadCard
          id={post._id}
          currentUserId={user.id}
          parentId={post.parentId}
          content={post.text}
          author={post.author}
          community={post.community}
          createdAt={post.createdAt}
          comments={post.children}
          reactions={parentReactions.users}
          reactState={parentReactionState}
        />
      </div>

      <div className="mt-7">
        <Comment
          threadId={params.id}
          currentUserImg={user.imageUrl}
          currentUserId={JSON.stringify(userInfo._id)}
        />
      </div>

      <div className="mt-10">
        {post.children.map((childItem: any, idx: number) => (
          <ThreadCard
            key={childItem._id}
            id={childItem._id}
            currentUserId={user.id}
            parentId={childItem.parentId}
            content={childItem.text}
            author={childItem.author}
            community={childItem.community}
            createdAt={childItem.createdAt}
            comments={childItem.children}
            reactions={childrenReactions[idx].users}
            reactState={childrenReactionState[idx]}
            isComment
          />
        ))}
      </div>
    </section>
  );
}

export default Page;
