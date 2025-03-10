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

export default function FormInput({
  label,
  value,
  required,
  placeholder,
  type,
}: FormInputProps) {
  const [model, setValue] = useState(value);
  const [typeModel, setType] = useState(type || "text");
  return (
    <div className="grid w-full items-center gap-1.5">
      <div className="text-sm">
        {label} {required ? <span className="text-danger-600">*</span> : ""}
      </div>
      <div className="relative">
        <Input
          type={typeModel}
          id="lengkap"
          placeholder={placeholder}
          value={model}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
        {type === "password" && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
            onClick={() =>
              setType(typeModel === "password" ? "text" : "password")
            }
          >
            {typeModel === "password" ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>
        )}
      </div>
    </div>
  );
}
