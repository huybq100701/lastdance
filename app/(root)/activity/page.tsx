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
  console.log('acti', activity);

  return (
    <>
      <h1 className="head-text">Activity</h1>

      <section className="mt-10 flex flex-col gap-5">
        {activity.length > 0 ? (
          <>
            {activity.map((activity: any) => (
              <div key={activity._id}>
                {activity.activityType === "event" ? (
                  <>
                    {user.id === activity.opponent.id && (
                      <article className="activity-card">
                        <EventComponent
                          author={activity.author}
                          opponent={activity.opponent}
                          createdAt={activity.createdAt}
                          activityType={activity.activityType}
                          text={activity.text}
                        />
                      </article>
                    )}
                  </>
                ) : (
                  <Link
                    href={`${
                      (activity.parentId && `/thread/${activity.parentId}`) ||
                      `/profile/${activity.author.id}`
                    }`}
                  >
                    <article className="activity-card">
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
  <p className="!text-small-regular text-light-1 flex items-center">
    <Link className="flex items-center" key={author._id} href={`/profile/${author.id}`}>
      {author.image && (
        <Image
          src={author.image}
          alt="user_logo"
          width={20}
          height={20}
          className="rounded-full object-cover"
        />
      )}
      {author.name && <span className="text-primary-500 mx-2">{author.name}</span>}
    </Link>{" "}
    <>
      {activityType === "follow" && `followed you`}
      {activityType === "reaction" && `liked your thread`}
      {text && `replied to your thread: "${truncateString(text, 100)}"`}
    </>
    <span className="text-gray-1">~ {formatDateWithMeasure(createdAt)}</span>
  </p>
);

const EventComponent = ({ author, createdAt, activityType }: any) => (
  <p className="!text-small-regular text-light-1 flex items-center">
    <Link key={author._id} href={`/profile/${author.id}`} className="flex items-center">
      <Image
        src={author.image}
        alt="user_logo"
        width={20}
        height={20}
        className="rounded-full object-cover"
      />
      <span className="text-primary-500 mx-2">{author.name}</span>
    </Link>{" "}
    <>
      {activityType === "event" && `created an event`}
    </>
    <span className="text-gray-1">~ {formatDateWithMeasure(createdAt)}</span>
  </p>
);

const ApproveComponent = ({ opponent, activityType, title, approve }: any) => (
  <p className="!text-small-regular text-light-1 flex items-center">
    <div>
      <Link key={opponent._id} href={`/profile/${opponent.id}`} className="flex items-center">
        <Image
          src={opponent.image}
          alt="user_logo"
          width={20}
          height={20}
          className="rounded-full object-cover"
        />
        <span className="text-primary-500 mx-2">{opponent.name}</span>
      </Link>
    </div>{" "}
    <>
      {activityType === "approve" && (
        <>
          {approve ? (
            <span>
              approved an event: "{truncateString(title, 100)}"
            </span>
          ) : (
            <span>
              not approved or pending for event: "{truncateString(title, 100)}"
            </span>
          )}
        </>
      )}
    </>
  </p>
);

export default Page;
