"use client";

import { SearchIcon } from "lucide-react";
import React, { useState } from "react";

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
}

export default function Search({ onChange, value }: SearchProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="flex items-center rounded-full p-2 border border-gray-300 w-full">
      <SearchIcon />
      <input
        type="text"
        placeholder="Search..."
        value={value}
        onChange={handleChange}
        className="border-none outline-none rounded-full ml-2 w-full"
      />
    </div>
  );
}
