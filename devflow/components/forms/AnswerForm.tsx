"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { MDXEditorMethods } from "@mdxeditor/editor";
import { ReloadIcon } from "@radix-ui/react-icons";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRef, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "@/hooks/use-toast";
import { createAnswer } from "@/lib/actions/answer.action";
import { api } from "@/lib/api";
import { AnswerSchema } from "@/lib/validations";

import { Button } from "../ui/button";
import { Form, FormField, FormItem, FormControl, FormMessage } from "../ui/form";

const Editor = dynamic(() => import("@/components/editor"), {
  ssr: false,
});

interface Props {
  questionId: string;
  questionTitle: string;
  questionContent: string;
}

const AnswerForm = ({ questionId, questionTitle, questionContent }: Props) => {
  const session = useSession();
  const [isAnswering, startAnsweringTransition] = useTransition();

  const [aiSubmitting, setAiSubmitting] = useState(false);

  const editorRef = useRef<MDXEditorMethods>(null);

  const form = useForm<z.infer<typeof AnswerSchema>>({
    resolver: zodResolver(AnswerSchema),
    defaultValues: {
      content: "",
    },
  });

  const handleCreateAnswer = async (values: z.infer<typeof AnswerSchema>) => {
    startAnsweringTransition(async () => {
      const result = await createAnswer({
        content: values.content,
        questionId,
      });

      if (result.success) {
        toast({
          title: "Success",
          description: "Your answer has been created successfully.",
        });

        if (editorRef.current) {
          editorRef.current.setMarkdown("");
        }
      } else {
        toast({
          title: `Error (${result.status})`,
          description: result.error?.message,
          variant: "destructive",
        });
      }
    });
  };

  const generateAIAnswer = async () => {
    if (session.status !== "authenticated") {
      return toast({
        title: "Please log in",
        description: "You must log in to generate an AI answer.",
      });
    }

    setAiSubmitting(true);

    // store answer written by user for more context to feed to ai
    const userAnswer = editorRef.current?.getMarkdown();

    try {
      const { success, data, error } = await api.ai.getAnswer(questionTitle, questionContent, userAnswer);

      if (!success) {
        return toast({
          title: "Error",
          description: `Failed to generate AI answer. Please try again. ${JSON.stringify(error)}`,
          variant: "destructive",
        });
      }

      const formattedAnswer = data.replace(/<br>/g, " ").toString().trim();

      if (editorRef.current) {
        editorRef.current.setMarkdown(formattedAnswer);

        // validate content field automatically
        form.setValue("content", formattedAnswer);
        form.trigger("content");
      }

      toast({
        title: "AI Answer Generated",
        description: "The AI has successfully generated an answer.",
      });
    } catch (error: Error | unknown) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "There was a problem with your request.",
        variant: "destructive",
      });
    } finally {
      setAiSubmitting(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
        <h4 className="paragraph-semibold text-dark400_light800">Write your answer here</h4>

        <Button
          className="btn light-border-2 text-primary-500 dark:text-primary-500 gap-1.5 rounded-md border px-4 py-2.5 shadow-none"
          disabled={aiSubmitting}
          onClick={generateAIAnswer}
        >
          {aiSubmitting ? (
            <>
              <ReloadIcon className="mr-2 size-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Image
                src="/icons/stars.svg"
                alt="Generate AI answer"
                width={12}
                height={12}
                className="object-contain"
              />
              Generate AI answer
            </>
          )}
        </Button>
      </div>

      <Form {...form}>
        <form className="mt-6 flex w-full flex-col gap-10" onSubmit={form.handleSubmit(handleCreateAnswer)}>
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormControl className="mt-3.5">
                  <Editor value={field.value} editorRef={editorRef} fieldChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button type="submit" className="primary-gradient w-fit" disabled={isAnswering}>
              {isAnswering ? (
                <>
                  <ReloadIcon className="mr-2 size-4 animate-spin" />
                  Posting...
                </>
              ) : (
                <>Post Answer</>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AnswerForm;
