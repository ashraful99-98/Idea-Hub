"use client";

import { Doc } from "@/convex/_generated/dataModel";
import {
  PopoverTrigger,
  Popover,
  PopoverContent,
} from "@/components/ui/popover";
import { useOrigin } from "@/hooks/use-origin";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Check, Copy, Globe } from "lucide-react";
interface PublishProps {
  initialData: Doc<"documents">;
}

export const Publish = ({ initialData }: PublishProps) => {
  const origin = useOrigin();
  const update = useMutation(api.documents.update);

  const [copied, setCopied] = useState(false);

  const [isSubmittion, setIsSubmission] = useState(false);

  const url = `${origin}/preview/${initialData._id}`;

  const onPublish = () => {
    setIsSubmission(true);

    const promise = update({
      id: initialData._id,
      isPublished: true,
    }).finally(() => setIsSubmission(false));

    toast.promise(promise, {
      loading: "Publishing...",
      success: "Note published",
      error: "Failed to published note.",
    });
  };
  const onUnPublish = () => {
    setIsSubmission(false);

    const promise = update({
      id: initialData._id,
      isPublished: false,
    }).finally(() => setIsSubmission(false));

    toast.promise(promise, {
      loading: "Unpublishing...",
      success: "Note Unpublished",
      error: "Failed to unpublished note.",
    });
  };

  const onCopy = () => {
    navigator.clipboard.writeText(url);

    setTimeout(() => {
      setCopied(true);
    }, 1000);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="sm" variant="ghost">
          Publish
          {initialData.isPublished && (
            <Globe className=" to-sky-500 w-4 h-4 ml-2" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-72
      "
        align="end"
        alignOffset={8}
        forceMount
      >
        {initialData.isPublished ? (
          <div className=" space-x-4 ">
            <div className=" flex items-center gap-x-2 mb-2">
              <Globe
                className=" text-sky-500 animate-pulse h-4 w-4
              "
              />
              <p className=" text-xs font-medium text-sky-500">
                This note live on web.
              </p>
            </div>
            <div className=" flex items-center mb-2">
              <input
                type=""
                value={url}
                className=" flex-1 px-2 text-xs border rounded-l-md h-8 bg-muted truncate"
                disabled
              />
              <Button
                onClick={onCopy}
                disabled={copied}
                className="h-8 rounded-l-none"
              >
                {copied ? (
                  <Check className=" w-4 h-4" />
                ) : (
                  <Copy className=" w-4 h-4" />
                )}
              </Button>
            </div>
            <Button
              size="sm"
              className=" w-60 text-xs"
              disabled={isSubmittion}
              onClick={onUnPublish}
            >
              Unpublish
            </Button>
          </div>
        ) : (
          <div className=" flex flex-col items-center justify-center">
            <Globe className="h-8 w-8 text-muted-foreground" />
            <p className="text-sm  font-medium mb-2">Published this note.</p>
            <span className=" text-xs text-muted-foreground">
              Share your work with others.
            </span>
            <Button
              disabled={isSubmittion}
              onClick={onPublish}
              className=" w-full text-xs"
              size="sm"
            >
              Publish
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};
