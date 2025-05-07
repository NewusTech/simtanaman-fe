"use client";

import React from "react";

interface FileInputProps {
  file: File | string;
  onChange: (file: File | string) => void;
}

const FileInput: React.FC<FileInputProps> = ({ file, onChange }) => {
  return (
    <div className="relative w-full">
      <input
        id="file-input"
        type="file"
        accept=".jpg,.jpeg,.png,.pdf"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const selectedFile = e.target.files && e.target.files[0];
          onChange(selectedFile || "");
        }}
      />
      <label
        htmlFor="file-input"
        className="flex items-center justify-between w-full h-[42px] px-1.5 py-2 text-sm border border-neutral-300 rounded-full bg-white cursor-pointer"
        role="button"
        aria-controls="file-input"
      >
        <span
          className={`pl-2.5 truncate ${
            typeof window !== "undefined" &&
            typeof file === "object" &&
            file instanceof File
              ? "text-neutral-700"
              : "text-neutral-400"
          }`}
        >
          {typeof window !== "undefined" && file instanceof File
            ? file.name
            : "Pilih File"}
        </span>
        <div
          className="px-5 py-[5px] text-sm font-normal text-neutral-700 bg-neutral-300 rounded-full whitespace-nowrap"
          aria-hidden="true"
        >
          Pilih File
        </div>
      </label>
    </div>
  );
};

export default FileInput;
