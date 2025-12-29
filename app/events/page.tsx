import { EventCard, FilterBar, PageHero } from '@/app/components/events';
import eventsData from '@/data/events.json';

export default function EventsPage() {
  // Sample event data - replace with actual data fetching later
  const events = eventsData.events;


  return (
    <div className="min-h-screen bg-[var(--color-background-light-gray)]">
      {/* Main Content Area */}
      <main className="mx-auto max-w-6xl bg-[var(--color-background-light-gray)] px-6 py-12 sm:px-8 lg:px-12">
        {/* Hero Section */}
        <PageHero />

        {/* Filter Section */}
        <div className="mb-10">
          <FilterBar
            locationOptions={['Main Auditorium', 'Conference Hall', 'Online']}
            eventTypeOptions={['Workshop', 'Seminar', 'Hackathon', 'Meetup']}
          />
        </div>

        {/* Upcoming Events Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-medium text-[var(--color-text-black)] md:text-4xl">
            Upcoming Events
          </h2>
          {/* Mobile-only separator */}
          <div className="mt-2 h-0.5 w-full bg-[var(--color-text-black)] md:hidden" />
        </div>

        {/* Event Cards */}
        <div className="flex flex-col gap-6">
          {events.map((event, index) => (
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
          ))}
        </div>
      </main>
    </div>
  );
}

