import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { db } from "@/lib/dexie/db";
import React, { useState } from "react";
import { toast } from "sonner";

export default function CreateNote({ onContentChange, onTitleChange }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleCreateNote = async () => {
    if (!title.trim().length && !content.trim().length) return;

    const promise = db.notes.add({
      title: title.trim(),
      content: content.trim(),
    });

    toast.promise(promise, {
      loading: "Creating note...",
      success: "Note created",
      error: "Problem while creating note",
    });

    await promise;
    setTitle("");
    setContent("");
  };

  return (
    <Card className="mx-auto w-full max-w-sm">
      <CardContent>
        <div className="">
          <Input
            type="text"
            placeholder="Title"
            className="border-none focus-visible:ring-0 focus-visible:outline-none py-6 text-lg"
            value={title}
            onChange={(e) => {
              setTitle(e.currentTarget.value);
              onTitleChange(e.currentTarget.value);
            }}
          />
          <Separator />
          <Textarea
            placeholder="Add content here"
            className="border-none focus-visible:ring-0 focus-visible:outline-none resize-none field-sizing-content text-xs!"
            value={content}
            onChange={(e) => {
              setContent(e.currentTarget.value);
              onContentChange(e.currentTarget.value);
            }}
          />
          <Button
            type="button"
            className="w-full mt-4"
            onClick={handleCreateNote}
          >
            Add
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
