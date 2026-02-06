import Link from "next/link";
import { Suspense } from "react";

import { hasVoted } from "@/lib/actions/vote.action";
import { cn, getTimeStamp } from "@/lib/utils";

import Preview from "../editor/Preview";
import EditDeleteAction from "../user/EditDeleteAction";
import UserAvatar from "../UserAvatar";
import Votes from "../votes/Votes";

interface Props extends Answer {
  containerClasses?: string;
  showReadMore?: boolean;
  showActionBtns?: boolean;
}

const AnswerCard = async ({
  _id,
  author,
  content,
  upvotes,
  question,
  downvotes,
  createdAt,
  containerClasses,
  showReadMore = false,
  showActionBtns = false,
}: Props) => {
  const hasVotedPromise = hasVoted({
    targetId: _id,
    targetType: "answer",
  });

  return (
    <article
      className={cn("light-border relative border-b py-10", containerClasses)}
    >
      <span id={`answer-${_id}`} className="hash-span"></span>

      {showActionBtns && (
        <div className="background-light800_dark300 flex-center absolute -top-5 -right-2 size-9 rounded-full">
          <EditDeleteAction type="Answer" itemId={_id} />
        </div>
      )}

      <div className="mb-5 flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
        <div className="flex flex-1 items-start gap-1 sm:items-center">
          <UserAvatar
            id={author._id}
            name={author.name}
            imageUrl={author.image}
            className="size-5 rounded-full object-cover max-sm:mt-0.5"
          />

          <Link
            href={`/profile/${author._id}`}
            className="flex flex-col sm:flex-row sm:items-center"
          >
            <p className="body-semibold text-dark300_light700">
              {author.name ?? "Anonymous"}
            </p>

            <p className="small-regular text-light400_light500 mt-0.5 ml-0.5 line-clamp-1">
              <span className="max-sm:hidden"> • </span> answered{" "}
              {getTimeStamp(createdAt)}
            </p>
          </Link>
        </div>

        <div className="flex justify-end">
          <Suspense fallback={<div>...</div>}>
            <Votes
              targetId={_id}
              targetType="answer"
              hasVotedPromise={hasVotedPromise}
              upvotes={upvotes}
              downvotes={downvotes}
            />
          </Suspense>
        </div>
      </div>

      <Preview content={content} />

      {showReadMore && (
        <Link
          href={`/questions/${question}#answer-${_id}`}
          className="body-semibold font-space-grotesk text-primary-500 relative z-10"
        >
          <p className="mt-1">Read more ...</p>
        </Link>
      )}
    </article>
  );
};

export default AnswerCard;
