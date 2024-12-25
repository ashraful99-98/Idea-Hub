"use client";
import { useTheme } from "next-themes";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { useBlockNote, useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
// import "@blocknote/core/style.css";
import { useEditorChange } from "@blocknote/react";
import { useCallback } from "react";
interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
}

export const Editor = ({ onChange, initialContent, editable }: EditorProps) => {
  const { resolvedTheme } = useTheme();

  // const editor: BlockNoteEditor = useBlockNote({
  //   editable,
  //   inlineContent: initialContent
  //     ? (JSON.parse(initialContent) as PartialBlock[])
  //     : undefined,

  //   onEditorContentChange: (editor) => {
  //     onchange(JSON.stringify(editor.topLevelBlocks, null, 2));
  //   },
  // });

  const editor: BlockNoteEditor | null = useCreateBlockNote({
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
  });
  const uploadToDatabase = useCallback(() => {
    if (onChange) {
      setTimeout(() => {
        onChange(JSON.stringify(editor.document));
      }, 1000);
    }
  }, [editor, onChange]);

  return (
    <div>
      <BlockNoteView
        theme={resolvedTheme === "dark" ? "dark" : "light"}
        editor={editor}
        editable={editable}
        // onChange={(editor: any) =>
        //   onChange(JSON.stringify(editor.topLevelBlocks, null, 2))
        // }
        onChange={uploadToDatabase}
      />
    </div>
  );
};
