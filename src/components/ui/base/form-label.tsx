"use client";
import { useState } from "react";
import { Input } from "../input";
import { Eye, EyeOff } from "lucide-react";

interface FormInputProps {
  label: string;
  value: string;
  placeholder?: string;
  required?: boolean;
  type?: string;
}

export default function FormLabel({
  label,
  value,
  required,
  placeholder,
  type,
}: FormInputProps) {
  const [typeModel, setType] = useState(type || "text");
  return (
    <div className="grid w-full items-center gap-1.5">
      <div className="text-sm font-medium">
        {label} {required ? <span className="text-danger-600">*</span> : ""}
      </div>
      <div className="relative">
        <Input
          className="border-none shadow-none p-0 cursor-default"
          disabled={true}
          type={typeModel}
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            // setValue(e.target.value);
          }}
        />
      </div>
    </div>
  );
}
