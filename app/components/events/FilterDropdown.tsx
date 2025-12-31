'use client';

import { ChevronDownIcon } from '@/app/components/icons';

interface FilterDropdownProps {
  label: string;
  options?: string[];
  colorbg?: string;
  colortext?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export default function FilterDropdown({
  label,
  options = [],
  colorbg,
  colortext,
  value,
  onChange
}: FilterDropdownProps) {

  return (
    <div className="relative flex items-center">
      <select
        value={value || ''}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full appearance-none rounded-full font-medium border-0 px-4 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-opacity-30"
        style={{ 
          backgroundColor: colorbg, 
          color: colortext,
        }}
      >
        <option value="">
          {label}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute right-3 flex items-center">
        <ChevronDownIcon
          className="h-5 w-5"
          style={{ color: colortext }}
        />
      </div>
    </div>
  );
}
