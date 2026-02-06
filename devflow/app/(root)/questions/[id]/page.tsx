import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { after } from "next/server";
import { Suspense } from "react";

import AllAnswers from "@/components/answers/AllAnswers";
import TagCard from "@/components/cards/TagCard";
import Preview from "@/components/editor/Preview";
import AnswerForm from "@/components/forms/AnswerForm";
import { Metric } from "@/components/Metric";
import SaveQuestion from "@/components/questions/SaveQuestion";
import UserAvatar from "@/components/UserAvatar";
import Votes from "@/components/votes/Votes";
import ROUTES from "@/constants/routes";
import { getAnswers } from "@/lib/actions/answer.action";
import { hasSavedQuestion } from "@/lib/actions/collection.action";
import { getQuestion, incrementViews } from "@/lib/actions/question.action";
import { hasVoted } from "@/lib/actions/vote.action";
import { formatNumber, getTimeStamp } from "@/lib/utils";

export async function generateMetadata({
  params,
}: RouteParams): Promise<Metadata> {
  const { id } = await params;

  const { success, data: question } = await getQuestion({ questionId: id });

  if (!success || !question) return {};

  return {
    title: question.title,
    description: question.content.slice(0, 100),
    twitter: {
      card: "summary_large_image",
      title: question.title,
      description: question.content.slice(0, 100),
    },
  };
}

const Page = async ({ params, searchParams }: RouteParams) => {
  const { id } = await params;
  const { page, pageSize, filter } = await searchParams;

  const { success, data: question } = await getQuestion({ questionId: id });

  if (!success || !question) return redirect("/404");

  after(async () => {
    await incrementViews({ questionId: id });
  });

  const {
    success: areAnswersLoaded,
    data: answersResult,
    error: answersError,
  } = await getAnswers({
    questionId: id,
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
    filter,
  });

  const hasVotedPromise = hasVoted({
    targetId: question._id,
    targetType: "question",
  });
  const hasSavedQuestionPromise = hasSavedQuestion({
    questionId: question._id,
  });

  return (
    <>
      <div className="flex-start w-full flex-col">
        <div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
          <div className="flex items-center justify-start gap-1">
            <UserAvatar
              id={question.author._id}
              name={question.author.name}
              imageUrl={question.author.image}
              className="size-[22px]"
              fallbackClassName="text-[10px]"
            />

            <Link href={ROUTES.PROFILE(question.author._id)}>
              <p className="paragraph-semibold text-dark300_light700">
                {question.author.name}
              </p>
            </Link>
          </div>

          <div className="flex items-center justify-end gap-4">
            <Suspense fallback={<div>...</div>}>
              <Votes
                targetType="question"
                targetId={question._id}
                upvotes={question.upvotes}
                downvotes={question.downvotes}
                hasVotedPromise={hasVotedPromise}
              />
            </Suspense>

            <Suspense fallback={<div>...</div>}>
              <SaveQuestion
                questionId={question._id}
                hasSavedQuestionPromise={hasSavedQuestionPromise}
              />
            </Suspense>
          </div>
        </div>
        <h2 className="h2-semibold text-dark200_light900 mt-3.5 w-full text-left">
          {question.title}
        </h2>
      </div>

      <div className="mt-5 mb-8 flex flex-wrap gap-4">
        <Metric
          imgUrl="/icons/clock.svg"
          alt="clock icon"
          value={` asked ${getTimeStamp(question.createdAt)}`}
          title=""
          textStyles="small-regular text-dark400_light700"
        />

        <Metric
          imgUrl="/icons/message.svg"
          alt="message icon"
          value={question.answers}
          title=" Answers"
          textStyles="small-medium text-dark400_light700"
        />

        <Metric
          imgUrl="/icons/eye.svg"
          alt="eye icon"
          value={formatNumber(question.views)}
          title=" Views"
          textStyles="small-medium text-dark400_light700"
        />
      </div>

      <Preview content={question.content} />

      <div className="mt-8 flex flex-wrap gap-2">
        {question.tags.map((tag: Tag) => (
          <TagCard
            key={tag._id}
            _id={tag._id as string}
            name={tag.name}
            compact
          />
        ))}
      </div>

      <section className="my-5">
        <AllAnswers
          page={Number(page) || 1}
          data={answersResult?.answers || []}
          isNext={answersResult?.isNext || false}
          success={areAnswersLoaded}
          error={answersError}
          totalAnswers={answersResult?.totalAnswers || 0}
        />
      </section>

      <section className="my-5">
        <AnswerForm
          questionId={question._id}
          questionTitle={question.title}
          questionContent={question.content}
        />
      </section>
    </>
  );
};

export default Page;
