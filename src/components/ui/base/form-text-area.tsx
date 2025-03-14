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
}

export default function FormTextArea({
  label,
  value,
  required,
  placeholder,
}: FormTextAreaProps) {
  const [model, setValue] = useState(value);
  return (
    <div className="grid w-full items-center gap-1.5">
      <div className="text-sm">
        {label} {required ? <span className="text-danger-600">*</span> : ""}
      </div>
      <div className="relative">
        <Textarea
          id="lengkap"
          placeholder={placeholder}
          value={model}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
      </div>
    </div>
  );
}
