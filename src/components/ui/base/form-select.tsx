"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../select";

interface FormSelectProps {
  label: string;
  value: Array<string>;
  required?: boolean;
  selected?: string;
}

export default function FormSelect({
  label,
  required,
  value,
  selected,
}: FormSelectProps) {
  return (
    <div className="w-full flex flex-col items-start gap-1.5">
      <div className="text-sm">
        {label} {required ? <span className="text-danger-600">*</span> : ""}
      </div>
      <Select>
        <SelectTrigger className="w-full rounded-full border border-gray-300 p-2 px-4">
          <SelectValue placeholder={"Pilih " + label} />
        </SelectTrigger>
        <SelectContent className="bg-white shadow-md rounded-md w-full">
          <SelectGroup>
            {value.map((item) => (
              <SelectItem
                key={item}
                value={item.trim()}
                onClick={() => (selected = item.trim())}
                className="p-2 hover:bg-gray-100 cursor-pointer"
              >
                {item.trim()}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
