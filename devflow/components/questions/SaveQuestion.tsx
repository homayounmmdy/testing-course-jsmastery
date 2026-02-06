"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { use, useState } from "react";

import { toast } from "@/hooks/use-toast";
import { toggleSaveQuestion } from "@/lib/actions/collection.action";

interface Props {
  questionId: string;
  hasSavedQuestionPromise: Promise<ActionResponse<{ saved: boolean }>>;
}

const SaveQuestion = ({ questionId, hasSavedQuestionPromise }: Props) => {
  const session = useSession();
  const userId = session?.data?.user?.id;

  const { data } = use(hasSavedQuestionPromise);

  const { saved: hasSaved } = data || {};

  const [isLoading, setIsLoading] = useState(false);

  const showLoginToast = () => {
    toast({
      title: "Please log in",
      description: "You must be logged in to perform this action",
    });
  };

  const handleSave = async () => {
    if (!userId) return showLoginToast();

    setIsLoading(true);
    try {
      const { success, data, error } = await toggleSaveQuestion({
        questionId,
      });

      if (!success) throw new Error(error?.message);

      toast({
        title: `Question ${data?.saved ? "Saved in" : "Removed from"} your collection`,
        variant: data?.saved ? "default" : "destructive",
      });
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Image
      src={hasSaved ? "/icons/star-filled.svg" : "/icons/star-red.svg"}
      width={18}
      height={18}
      alt="save"
      className={`cursor-pointer ${isLoading && "opacity-50"}`}
      onClick={() => !isLoading && handleSave()}
      aria-label="Save question"
    />
  );
};

export default SaveQuestion;
