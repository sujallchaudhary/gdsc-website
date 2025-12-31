'use client';

import { SearchIcon } from '@/app/components/icons';

interface SearchInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export default function SearchInput({
  placeholder = "Search",
  value,
  onChange
}: SearchInputProps) {
  const colors = {
    bg: 'var(--color-light-red)',
    text: 'var(--color-dark-red)',
  };

  return (
    <div className="relative flex items-center">
      <style>{`
        .search-input-placeholder::placeholder {
          color: ${colors.text};
          opacity: 1;
        }
      `}</style>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="search-input-placeholder w-full rounded-full border-0 font-medium px-4 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-opacity-100"
        style={{ 
          backgroundColor: colors.bg, 
          color: colors.text,
        }}
      />
      <div className="absolute right-3 flex items-center">
        <SearchIcon
          className="h-5 w-5"
          style={{ color: colors.text }}
        />
      </div>
    </div>
  );
}
