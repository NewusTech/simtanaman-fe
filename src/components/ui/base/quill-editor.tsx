"use client";

import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface QuillEditorProps {
  content: string;
  setContent: (value: string) => void;
}

const QuillEditor = ({ content, setContent }: QuillEditorProps) => {
  return (
    <div>
      <ReactQuill
        value={content}
        onChange={setContent}
        className="min-h-56"
        theme="snow"
        placeholder="Masukan Tentang"
        modules={{
          toolbar: [
            ["bold", "italic", "underline"],
            [{ header: [1, 2, false] }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
            ["blockquote", "code-block"],
          ],
        }}
      />
    </div>
  );
};

export default QuillEditor;
