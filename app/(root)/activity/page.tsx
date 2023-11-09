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
      <section className="flex flex-col gap-5">
        {activity.length > 0 ? (
          activity.map((activity: any) => (
            <div key={activity._id}>
              {activity.activityType !== "event" && (
                <Link
                  href={
                    activity.parentId
                      ? `/thread/${activity.parentId}`
                      : `/profile/${activity.author.id}`
                  }
                >
                  <article className="activity-card">
                    <ActivityComponent
                      author={activity.author}
                      opponent={activity.opponent}
                      createdAt={activity.createdAt}
                      parentId={activity.parentId}
                      activityType={activity.activityType}
                      text={activity.text}
                    />
                  </article>
                </Link>
              )}
            </div>
          ))
        ) : (
          <p className="!text-base-regular text-light-3">No activity yet</p>
        )}
      </section>

      <h1 className="head-text mt-5">Event</h1>
      <section className="flex flex-col gap-5">
        {activity.length > 0 ? (
          activity.map((activity: any) => (
            <div key={activity._id}>
              {activity.activityType === "event" && (
                <article className="activity-card">
                  <EventComponent
                    author={activity.author}
                    opponent={activity.opponent}
                    createdAt={activity.createdAt}
                    activityType={activity.activityType}
                    title={activity.title}
                  />
                </article>
              )}
            </div>
          ))
        ) : (
          <p className="!text-base-regular text-light-3">No event yet</p>
        )}
      </section>

      <h1 className="head-text">Approve</h1>
      <section className="flex flex-col gap-5">
        {activity.length > 0 ? (
          activity.map((activity: any) => (
            <div key={activity._id}>
              {activity.activityType === "approve" && (
                <article className="activity-card">
                  <ApproveComponent
                    author={activity.author}
                    opponent={activity.opponent}
                    activityType={activity.activityType}
                    title={activity.title}
                    approve={activity.approve}
                  />
                </article>
              )}
            </div>
          ))
        ) : (
          <p className="!text-base-regular text-light-3">No approval yet</p>
        )}
      </section>
    </>
  );
}

const ActivityComponent = ({ author, createdAt, activityType, text }: any) => (
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
    <span className="text-gray-1"> ~ {formatDateWithMeasure(createdAt)}</span>
  </p>
);

const EventComponent = ({ author, createdAt, activityType, title }: any) => (
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
      {activityType === "event" && `created an event: "${truncateString(title, 100)}"`}
    </>
    <span className="text-gray-1">~ {formatDateWithMeasure(createdAt)}</span>
  </p>
);


const ApproveComponent = ({userInfo, author, opponent, activityType, title, approve }: any) => (
  <div className="!text-small-regular text-light-1 flex items-center">
    {(opponent.id || author.id)  && (
      <div className="flex items-center">
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
        <div className=""> 
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
        </div>
      </div>
    )}
  </div>
);




export default Page;
export const runtime = 'edge';