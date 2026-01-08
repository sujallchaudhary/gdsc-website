// Feed page component

import { SearchIcon, DropdownIcon } from "@/components/icons";

export default function Feed() {
  const links = [
    "https://www.instagram.com/gdgnsut/",
    "https://youtube.com",
    "https://instagram.com",
    "https://www.instagram.com/gdgnsut",
    "https://www.instagram.com/gdgnsut",
    "https://www.instagram.com/gdgnsut",
  ];

  return (
    <main className="min-h-screen w-full bg-white px-4 sm:px-6 lg:px-12 py-6 sm:py-10">
      {/* ------------ HEADING ------------ */}
      <section className="mb-8 sm:mb-10">
        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-[700] text-gray-900">
          Take a look at our Feed
        </h1>

        <p className="mt-3 text-base sm:text-lg lg:text-xl text-gray-600">
          Follow us on{" "}
          <a
            href="https://instagram.com/GDGNSUT"
            target="_blank"
            className="text-blue-600 font-semibold hover:underline"
          >
            @GDGNSUT
          </a>{" "}
          and stay tuned to our upcoming events and announcements.
        </p>
      </section>

      {/* ------------ FILTERS (Search + Dropdown) ------------ */}
      <section className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        {/* Search input */}
        <div className="relative w-full sm:w-72">
          <SearchIcon
            className="
              pointer-events-none
              absolute left-4 top-1/2
              -translate-y-1/2
              h-5 w-5
              text-emerald-700
            "
          />

          <input
            type="text"
            placeholder="Search"
            className="
              w-full rounded-2xl
              bg-emerald-100
              py-3 pl-12 pr-4
              text-emerald-900 placeholder-emerald-700
              outline-none
              focus:ring-2 focus:ring-emerald-400
            "
          />
        </div>

        {/* Dropdown (Event types) */}
        <div className="relative w-full sm:w-48">
          <select
            className="
              w-full rounded-2xl
              bg-blue-100
              px-5 py-3 pr-10
              text-blue-900
              outline-none
              appearance-none
              focus:ring-2 focus:ring-blue-400
            "
          >
            <option>Event types</option>
            <option>Workshops</option>
            <option>Hackathons</option>
            <option>Talks</option>
          </select>

          <DropdownIcon
            className="
              pointer-events-none
              absolute right-4 top-1/2
              -translate-y-1/2
              h-5 w-5
              text-blue-700
            "
          />
        </div>
      </section>

      {/* ------------ FEED GRID ------------ */}
      <section className="py-4 overflow-x-hidden">
        <div className="mx-auto max-w-screen-xl grid grid-cols-1 place-items-center gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <a
              key={i}
              href={links[i]}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full max-w-sm"
            >
              <div
                className="
          aspect-square
          w-full
          rounded-2xl
          overflow-hidden
          border-4 border-blue-200 
          transition-all duration-300
          hover:-translate-y-1
          hover:shadow-[0_8px_30px_rgba(66,133,244,0.35)]
        "
              >
                <img
                  src="/grid.png"
                  alt="Event"
                  className="h-full w-full object-cover"
                />
              </div>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
