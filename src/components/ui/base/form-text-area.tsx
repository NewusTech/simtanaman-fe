"use client";
import { useState } from "react";
import { Input } from "../input";
import { Eye, EyeOff } from "lucide-react";
import { Textarea } from "../textarea";

interface FormTextAreaProps {
  label: string;
  value: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (value: string) => void;
  errorMessage?: string | null;
}

export default function FormTextArea({
  label,
  value,
  required,
  onChange,
  placeholder,
  errorMessage,
}: FormTextAreaProps) {
  return (
    <div className="grid w-full items-center gap-1.5">
      <div className="text-sm">
        {label} {required ? <span className="text-danger-600">*</span> : ""}
      </div>
      <div className="relative">
        <Textarea
          id="lengkap"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange && onChange(e.target.value)}
        />
      </div>
      {errorMessage && (
        <div className="text-sm text-danger-600 mt-1">{errorMessage}</div>
      )}
    </div>
  );
}
