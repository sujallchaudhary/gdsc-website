'use client';

import SearchInput from './SearchInput';
import FilterDropdown from './FilterDropdown';

interface FilterBarProps {
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  locationValue?: string;
  onLocationChange?: (value: string) => void;
  eventTypeValue?: string;
  onEventTypeChange?: (value: string) => void;
  locationOptions?: string[];
  eventTypeOptions?: string[];
}

export default function FilterBar({
  searchValue,
  onSearchChange,
  locationValue,
  onLocationChange,
  eventTypeValue,
  onEventTypeChange,
  locationOptions = [],
  eventTypeOptions = []
}: FilterBarProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
      <div className="flex-1 max-w-62.5">
        <SearchInput
          placeholder="Search"
          value={searchValue}
          onChange={onSearchChange}
          iconClassName='text-dark-red'
          inputClassName='bg-light-red text-dark-red placeholder:text-dark-red'
        />
      </div>
      <div className="flex-1 max-w-62.5">
        <FilterDropdown
          label="Location"
          options={locationOptions}
          value={locationValue}
          onChange={onLocationChange}
          colorbg="var(--color-light-blue)"
          colortext="var(--color-dark-blue)"
        />
      </div>
      <div className="flex-1 max-w-62.5">
        <FilterDropdown
          label="Event Types"
          options={eventTypeOptions}
          colorbg="var(--color-light-green)"
          colortext="#0D652D"
          value={eventTypeValue}
          onChange={onEventTypeChange}
        />
      </div>
    </div>
  );
}

