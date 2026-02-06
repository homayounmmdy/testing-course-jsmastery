"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { use, useState } from "react";

import { toast } from "@/hooks/use-toast";
import { createVote } from "@/lib/actions/vote.action";
import { formatNumber } from "@/lib/utils";

interface Params {
  targetType: "question" | "answer";
  targetId: string;
  upvotes: number;
  downvotes: number;
  hasVotedPromise: Promise<ActionResponse<HasVotedResponse>>;
}

const Votes = ({
  targetType,
  targetId,
  upvotes,
  downvotes,
  hasVotedPromise,
}: Params) => {
  const session = useSession();
  const userId = session?.data?.user?.id;

  const { success, data } = use(hasVotedPromise);
  const [isLoading, setIsLoading] = useState(false);

  const { hasUpvoted, hasDownvoted } = data || {};

  const showLoginToast = () => {
    toast({
      title: "Please log in",
      description: "You must be logged in to perform this action",
    });
  };

  const handleVote = async (voteType: "upvote" | "downvote") => {
    if (!userId) return showLoginToast();

    setIsLoading(true);

    try {
      const result = await createVote({
        targetId,
        targetType,
        voteType,
      });

      if (!result.success) {
        return toast({
          title: "Error",
          description: result.error?.message,
          variant: "destructive",
        });
      }

      const successMessage =
        voteType === "upvote"
          ? `Upvote ${!hasUpvoted ? "Successful" : "Removed"}`
          : `Downvote ${!hasDownvoted ? "Successful" : "Removed"}`;

      toast({
        title: successMessage,
        variant:
          (voteType === "upvote" && hasUpvoted) ||
          (voteType === "downvote" && hasDownvoted)
            ? "destructive"
            : "default",
      });
    } catch {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-center gap-2.5">
      <div className="flex-center gap-1.5">
        <Image
          src={
            success && hasUpvoted ? "/icons/upvoted.svg" : "/icons/upvote.svg"
          }
          width={18}
          height={18}
          alt="upvote"
          className={`cursor-pointer ${isLoading && "opacity-50"}`}
          onClick={() => !isLoading && handleVote("upvote")}
          aria-label="Upvote"
        />

        <div className="flex-center background-light700_dark400 min-w-5 rounded-sm p-1">
          <p className="subtle-medium text-dark400_light900">
            {formatNumber(upvotes)}
          </p>
        </div>
      </div>

      <div className="flex-center gap-1.5">
        <Image
          src={
            success && hasDownvoted
              ? "/icons/downvoted.svg"
              : "/icons/downvote.svg"
          }
          width={18}
          height={18}
          alt="downvote"
          className={`cursor-pointer ${isLoading && "opacity-50"}`}
          onClick={() => !isLoading && handleVote("downvote")}
          aria-label="Downvote"
        />

        <div className="flex-center background-light700_dark400 min-w-5 rounded-sm p-1">
          <p className="subtle-medium text-dark400_light900">
            {formatNumber(downvotes)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Votes;
