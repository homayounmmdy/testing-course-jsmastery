import Link from "next/link";

import ROUTES from "@/constants/routes";
import { formatNumber, getTimeStamp } from "@/lib/utils";

import TagCard from "./TagCard";
import { Metric } from "../Metric";
import EditDeleteAction from "../user/EditDeleteAction";
import UserAvatar from "../UserAvatar";

interface Props {
  question: Question;
  showActionBtns?: boolean;
}

const QuestionCard = ({
  question: { _id, title, tags, author, createdAt, upvotes, answers, views },
  showActionBtns = false,
}: Props) => {
  return (
    <div className="card-wrapper rounded-[10px] px-7 py-9 sm:px-11">
      <div className="flex flex-col-reverse items-center justify-between gap-5 sm:flex-row">
        <div className="flex-1">
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {getTimeStamp(createdAt)}
          </span>
          <Link href={ROUTES.QUESTION(_id)}>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">{title}</h3>
          </Link>
        </div>

        {showActionBtns && <EditDeleteAction type="Question" itemId={_id} />}
      </div>

      <div className="mt-3.5 flex w-full flex-wrap gap-2">
        {tags.map((tag: Tag) => (
          <TagCard key={tag._id} _id={tag._id as string} name={tag.name} compact />
        ))}
      </div>

      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <div className="flex flex-row items-center gap-1">
          <div className="flex flex-row items-center gap-1">
            <UserAvatar
              id={author._id}
              name={author.name}
              imageUrl={author.image}
              className="size-4"
              fallbackClassName="text-[8px]"
            />
            <p className="body-medium text-dark400_light700">{author.name}</p>
          </div>

          <Metric
            value="• asked"
            title={getTimeStamp(createdAt)}
            textStyles="body-medium text-dark400_light700 max-sm:hidden"
          />
        </div>

        <div className="flex items-center gap-5 max-sm:flex-wrap max-sm:justify-start">
          <Metric
            imgUrl="/icons/like.svg"
            alt="like icon"
            value={formatNumber(upvotes)}
            title=" Votes"
            textStyles="small-medium text-dark400_light800"
          />

          <Metric
            imgUrl="/icons/message.svg"
            alt="message icon"
            value={formatNumber(answers)}
            title=" Answers"
            textStyles="small-medium text-dark400_light800"
          />

          <Metric
            imgUrl="/icons/eye.svg"
            alt="eye icon"
            value={formatNumber(views)}
            title=" Views"
            textStyles="small-medium text-dark400_light800"
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
