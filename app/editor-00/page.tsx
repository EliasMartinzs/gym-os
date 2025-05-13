"use client";

import { useState } from "react";
import { Editor } from "@/components/blocks/editor-00/editor";
import { initialValue } from "./editorInitialValue";

export default function EditorPage() {
  const [editorState, setEditorState] = useState(initialValue);

  return (
    <Editor
      editorSerializedState={editorState}
      onSerializedChange={(value) => setEditorState(value)}
    />
  );
}
