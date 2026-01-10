"use client";

import { SearchIcon } from "@/components/icons";
import { cn } from "@/libs/utils";

interface SearchInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  bgColor?: string;
  textColor?: string;
  inputClassName?: string;
  iconClassName?: string;
}

export default function SearchInput({
  placeholder = "Search",
  value,
  onChange,
  inputClassName = "",
  iconClassName = "",
}: SearchInputProps) {
  return (
    <div className="relative flex items-center">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className={cn(
          "w-full rounded-full border-0 font-medium px-4 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-opacity-100 placeholder:opacity-100",
          inputClassName
        )}
      />
      <div className="absolute right-3 flex items-center">
        <SearchIcon className={cn("h-5 w-5", iconClassName)} />
      </div>
    </div>
  );
}
