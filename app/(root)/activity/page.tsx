import Image from "next/image";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { fetchUser, getActivity } from "@/lib/actions/user.actions";
import { truncateString, formatDateWithMeasure } from "@/lib/utils";

async function Page() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const activity = await getActivity(userInfo._id);
  console.log('acti', activity)
  return (
    <>
      <h1 className="head-text">Activity</h1>

      <section className="mt-10 flex flex-col gap-5">
        {activity.length > 0 ? (
          <>
            {activity.map((activity: any) => (
              <div key={activity._id}>
                {activity.activityType === "event" ? (
                  <article className="activity-card">
                    <Image
                      src={activity.author.image}
                      alt="user_logo"
                      width={20}
                      height={20}
                      className="rounded-full object-cover"
                    />
                    {user.id === activity.opponent.id ? (
                      <ActivityComponent
                        author={activity.author}
                        opponent={activity.opponent}
                        createdAt={activity.createdAt}
                        activityType={activity.activityType}
                        eventId={activity.eventId}
                        text={activity.text}
                      />
                    ) : (
                      <ApproveComponent
                        author={activity.author}
                        opponent={activity.opponent}
                        activityType={activity.activityType}
                        text={activity.text}
                        title={activity.title}
                        approve={activity.approve}
                      />
                    )}
                  </article>
                ) : (
                  <Link
                    href={`${
                      (activity.parentId && `/thread/${activity.parentId}`) ||
                      `/profile/${activity.author.id}`
                    }`}
                  >
                    <article className="activity-card">
                      <Image
                        src={activity.author.image}
                        alt="user_logo"
                        width={20}
                        height={20}
                        className="rounded-full object-cover"
                      />
                      {user.id === activity.author.id ? (
                        <ApproveComponent
                          author={activity.author}
                          opponent={activity.opponent}
                          activityType={activity.activityType}
                          text={activity.text}
                          title={activity.title}
                          approve={activity.approve}
                        />
                      ) : (
                        <ActivityComponent
                          author={activity.author}
                          opponent={activity.opponent}
                          createdAt={activity.createdAt}
                          parentId={activity.parentId}
                          activityType={activity.activityType}
                          text={activity.text}
                        />
                      )}
                    </article>
                  </Link>
                )}
              </div>
            ))}
          </>
        ) : (
          <p className="!text-base-regular text-light-3">No activity yet</p>
        )}
      </section>
    </>
  );
}

const ActivityComponent = ({ author, opponent, createdAt, activityType, text }: any) => (
  <p className="!text-small-regular text-light-1">
    <Link key={author._id} href={`/profile/${author.id}`}>
      <span className="text-primary-500">{author.name}</span>
    </Link>{" "}
    <>
      {activityType === "follow" && `followed you`}
      {activityType === "reaction" && `liked your thread`}
      {activityType === "event" && `created an event`}
      {text && `replied to your thread: "${truncateString(text, 100)}"`}
    </>{" "}
    <span className="text-gray-1">~ {formatDateWithMeasure(createdAt)}</span>
  </p>
);

const ApproveComponent = ({ author, opponent, activityType, text, title, approve }: any) => (
  <p className="!text-small-regular text-light-1">
    <Link key={author._id} href={`/profile/${author.id}`}>
      <span className="text-primary-500">{author.name}</span>
    </Link>{" "}
    <>
      {activityType === "approve" && (
        <>
          {approve ? (
            `approved an event: "${truncateString(title, 100)}"`
          ) : (
            `not approved or pending for event: "${truncateString(title, 100)}"`
          )}
        </>
      )}
    </>{" "}
  </p>
);

export default Page;
