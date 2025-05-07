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
        <PopoverContent className="w-auto bg-slate-800 text-white shadow-md rounded-md p-3">
          {/*
            To achieve the exact dark theme styling as in the image (especially the purple selected date,
            greyed-out dates for other months, and specific text/icon colors for header and navigation),
            you might need to override CoreUI's default CSS classes or use their SASS variables.
            The Tailwind classes applied here provide a basic dark theme foundation.

            For example, you might need to add global CSS overrides like:
            .popover .calendar-header { color: white !important; }
            .popover .btn.date-picker-active-date { background-color: #6d28d9 !important; border-color: #6d28d9 !important; color: white !important; }
            .popover .btn.date-picker-other-month-date { color: #9ca3af !important; }
            .popover .btn:not(.date-picker-active-date) { color: white !important; }
            .popover .btn.calendar-nav { color: white !important; } // For nav icons
            (Adjust selectors and colors as needed based on CoreUI's actual rendered HTML and classes)
          */}
          <CCalendar
            className="!bg-transparent border-none" // Aims to use PopoverContent's background and remove default border
            locale="en-US" // For English month/day names like "February", "Mo", "Tu" as seen in the image
            endDate={date} // Changed from 'date' to 'endDate'
            onEndDateChange={(newDateValue:any) => {
              // Handles date selection and calls the onSelect callback from props
              let selectedDate: Date | undefined;

              // CoreUI might pass date as Date, string, or array of these
              if (Array.isArray(newDateValue)) {
            const firstItem = newDateValue[0];
            if (firstItem instanceof Date) {
              selectedDate = firstItem;
            } else if (typeof firstItem === 'string') {
              selectedDate = new Date(firstItem);
            }
              } else if (newDateValue instanceof Date) {
            selectedDate = newDateValue;
              } else if (typeof newDateValue === 'string') {
            selectedDate = new Date(newDateValue);
              }

              // Ensure a valid date was parsed/obtained before calling onSelect
              if (selectedDate && !isNaN(selectedDate.getTime())) {
            onSelect(selectedDate);
              }
            }}
          />
        </PopoverContent>
      </Popover>
      {errorMessage && (
        <div className="text-sm text-danger-600 mt-1">{errorMessage}</div>
      )}
    </div>
  )
}
