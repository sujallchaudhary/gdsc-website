'use client';

import { useState, useMemo } from 'react';
import { EventCard, FilterBar, PageHero } from '@/app/components/events';
import eventsData from '@/data/events.json';

export default function EventsPage() {
  // Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [eventTypeFilter, setEventTypeFilter] = useState('');

  // Get all events from JSON
  const allEvents = eventsData.events;

  // Filter events based on search query, location, and event type
  const filteredEvents = useMemo(() => {
    return allEvents.filter((event) => {
      // Search filter - matches title, description, or location
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = searchQuery === '' || 
        event.title.toLowerCase().includes(searchLower) ||
        event.description.toLowerCase().includes(searchLower) ||
        event.location.toLowerCase().includes(searchLower);

      // Location filter
      const matchesLocation = locationFilter === '' || 
        event.location === locationFilter;

      // Event type filter
      const matchesEventType = eventTypeFilter === '' || 
        event.eventType === eventTypeFilter;

      return matchesSearch && matchesLocation && matchesEventType;
    });
  }, [allEvents, searchQuery, locationFilter, eventTypeFilter]);

  // Get unique locations and event types for dropdown options
  const locationOptions = [...new Set(allEvents.map(e => e.location))];
  const eventTypeOptions = [...new Set(allEvents.map(e => e.eventType))];

  return (
    <div className="min-h-screen bg-[var(--color-background-light-gray)]">
      {/* Main Content Area */}
      <main className="mx-auto max-w-6xl bg-[var(--color-background-light-gray)] px-6 py-12 sm:px-8 lg:px-12">
        {/* Hero Section */}
        <PageHero />

        {/* Filter Section */}
        <div className="mb-10">
          <FilterBar
            searchValue={searchQuery}
            onSearchChange={setSearchQuery}
            locationValue={locationFilter}
            onLocationChange={setLocationFilter}
            eventTypeValue={eventTypeFilter}
            onEventTypeChange={setEventTypeFilter}
            locationOptions={locationOptions}
            eventTypeOptions={eventTypeOptions}
          />
        </div>

        {/* Upcoming Events Section */}
        <div className="mb-8">
          <div className="inline-block group cursor-pointer">
            <h2 className="text-3xl font-medium text-[var(--color-text-black)] md:text-4xl">
              Upcoming Events
            </h2>
            {/* Underline separator - visible on mobile (no animation), animates on desktop hover */}
            <div className="mt-2 h-0.5 w-full bg-[var(--color-text-black)] origin-left scale-x-100 md:scale-x-0 md:group-hover:scale-x-100 md:transition-transform md:duration-500 md:ease-out" />
          </div>
        </div>

        {/* Event Cards */}
        <div className="flex flex-col gap-6">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event, index) => (
              <EventCard
                key={index}
                image={event.image}
                time={event.time}
                date={event.date}
                title={event.title}
                description={event.description}
                location={event.location}
                socialLinks={event.socialLinks}
              />
            ))
          ) : (
            <div className="py-12 text-center text-lg text-[var(--color-text-gray)]">
              No events found matching your criteria.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

