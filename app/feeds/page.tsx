"use client";

import { useState, useMemo } from "react";
import { PageHero, SearchInput } from "@/components/events";
import { SearchIcon, DropdownIcon } from "@/components/icons";
import Image from 'next/image';

import feedsData from "@/data/feeds.json";

export default function Feed() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("");

  const allFeeds = feedsData.feeds;

  const filteredFeeds = useMemo(() => {
    return allFeeds.filter((feed) => {
      const searchLower = searchQuery.toLowerCase();
      // Search matches 'alt' text
      const matchesSearch =
        searchQuery === "" ||
        feed.alt.toLowerCase().includes(searchLower);

      // Filter matches 'category'
      const matchesFilter =
        filterType === "" || filterType === "All" || feed.category === filterType;

      return matchesSearch && matchesFilter;
    });
  }, [allFeeds, searchQuery, filterType]);

  // Extract unique categories for dropdown
  const categories = ["All", ...new Set(allFeeds.map((feed) => feed.category))];

  return (
    <main className="min-h-screen w-full bg-white px-4 sm:px-6 lg:px-12 py-6 md:py-10">
      {/* ------------ HEADING ------------ */}
      <section className="mb-8 sm:mb-10">
        <PageHero
          title="Take a look at our Feed"
          iconClassName="text-primary-red"
        />

        <p className="text-base sm:text-lg lg:text-xl text-gray-600">
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
        <SearchInput
          placeholder="Search"
          value={searchQuery}
          onChange={setSearchQuery}
          inputClassName="
            bg-emerald-100
            text-emerald-900
            placeholder:text-emerald-700
            rounded-2xl!
            py-3.5
            focus:ring-emerald-400
          "
          iconClassName="text-emerald-700"
        />

        {/* Dropdown (Categories) */}
        <div className="relative w-full sm:w-48">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
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
            <option value="">All Categories</option>
            {categories.filter(c => c !== "All").map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
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
          {filteredFeeds.length > 0 ? (
            filteredFeeds.map((feed) => (
              <a
                key={feed.id}
                href={feed.link}
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
                  <Image
                    src={feed.image}
                    alt={feed.alt}
                    width={400}
                    height={400}
                    className="h-full w-full object-cover"
                  />
                  {/* Optional: Show category on hover or overlay? Keeping clean for now as per design */}
                </div>
              </a>
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-lg text-gray-500">
              No posts found matching your criteria.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
