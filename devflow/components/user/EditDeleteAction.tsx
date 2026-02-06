"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { toast } from "@/hooks/use-toast";
import { deleteAnswer } from "@/lib/actions/answer.action";
import { deleteQuestion } from "@/lib/actions/question.action";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

interface Props {
  type: string;
  itemId: string;
}

const EditDeleteAction = ({ type, itemId }: Props) => {
  const router = useRouter();

  const handleEdit = async () => {
    router.push(`/questions/${itemId}/edit`);
  };

  const handleDelete = async () => {
    if (type === "Question") {
      // TODO: implement delete question (deleteQuestion)
      await deleteQuestion({ questionId: itemId });

      toast({
        title: "Question Deleted",
        variant: "destructive",
        description: "Your question has been successfully deleted.",
      });
    } else if (type === "Answer") {
      // TODO: implement delete answer (deleteAnswer)
      await deleteAnswer({ answerId: itemId });

      toast({
        title: "Answer Deleted",
        variant: "destructive",
        description: "Your answer has been successfully deleted.",
      });
    }
  };

  return (
    <div className="flex items-center justify-end gap-3 max-sm:w-full">
      {type === "Question" && (
        <Image
          src="/icons/edit.svg"
          alt="edit"
          width={14}
          height={14}
          className="cursor-pointer object-contain"
          onClick={handleEdit}
        />
      )}

      <AlertDialog>
        <AlertDialogTrigger className="cursor-pointer">
          <Image src="/icons/trash.svg" alt="trash" width={14} height={14} />
        </AlertDialogTrigger>

        <AlertDialogContent className="background-light800_dark300">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              {type === "Question" ? " question" : " answer"} and remove your
              data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="btn">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="border-primary-100! bg-primary-500! text-light-700!"
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default EditDeleteAction;
