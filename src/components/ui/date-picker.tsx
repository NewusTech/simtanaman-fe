"use client";

import * as React from "react";
import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "recharts";

interface DatePickerProps {
  label: string;
  required?: boolean;
  date: Date;
  onSelect: (date: Date) => void;
}

export default function DatePicker({
  date,
  onSelect,
  label,
  required,
}: DatePickerProps) {
  return (
    <div className="flex flex-col items-start w-full gap-1.5">
      <div className="text-sm">
        {label} {required ? <span className="text-danger-600">*</span> : ""}
      </div>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal relative rounded-full",
              !date && "text-muted-foreground"
            )}
          >
            {date ? (
              format(date, "dd MMMM yyyy", { locale: localeId })
            ) : (
              <span>Pilih tanggal</span>
            )}
            <CalendarIcon className="h-4 w-4 absolute right-3" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 bg-white shadow-md rounded-md">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(date) => date && onSelect(date)}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
