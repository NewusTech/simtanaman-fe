"use client";

import React from 'react'
import { CCalendar } from '@coreui/react-pro'
// import '@coreui/coreui-pro/dist/css/coreui.min.css';
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { CalendarIcon } from 'lucide-react';
import { id as localeId } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface DateCalendarProps {
    label: string;
    required?: boolean;
    date: Date;
    onSelect: (date: Date) => void;
    errorMessage?: string | null;
  }

export const DateCalendar = ({
    date,
    onSelect,
    label,
    required,
    errorMessage
  }: DateCalendarProps) => {
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
        <PopoverContent className="w-auto p-0 bg-white shadow-md rounded-md opacity-100">
          {/* <Calendar
            mode="single"
            selected={date}
            onSelect={(date) => date && onSelect(date)}
          /> */}
          <CCalendar className="border rounded bg-white" locale="en-US" startDate="2024/02/13" />
        </PopoverContent>
      </Popover>
      {errorMessage && (
        <div className="text-sm text-danger-600 mt-1">{errorMessage}</div>
      )}
    </div>
  )
}
