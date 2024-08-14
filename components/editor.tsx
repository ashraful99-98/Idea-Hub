"use client";

import { BlockNoteEditor, PartialBlock } from "@blocknote/core";

import { BlockNoteViewProps, useCreateBlockNote } from "@blocknote/react";

import "@blocknote/core/style.css";

interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
}

export const Editor = ({ onChange, initialContent, editable }: EditorProps) => {
  return <div>Editor</div>;
};
