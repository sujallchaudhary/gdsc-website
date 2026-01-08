import Image from 'next/image';
import SocialIcons from './SocialIcons';

interface EventCardProps {
  image: string;
  time: string;
  date: string;
  title: string;
  description: string;
  location: string;
  socialLinks?: {
    instagram?: string;
    github?: string;
    linkedin?: string;
    discord?: string;
  };
}

export default function EventCard({
  image,
  time,
  date,
  title,
  description,
  location,
  socialLinks
}: EventCardProps) {
  return (
    <div className="flex flex-col gap-4 rounded-4xl bg-[var(--color-background-gray)] p-5 sm:flex-row sm:gap-6 sm:p-4 transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-lg cursor-pointer">
      {/* Event Image */}
      <div className="relative h-56 w-full shrink-0 overflow-hidden rounded-4xl sm:h-44 sm:w-64">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </div>

      {/* Event Content */}
      <div className="flex flex-1 flex-col justify-between gap-3">
        <div className="flex flex-col gap-2">
          {/* Time and Date */}
          <div className="text-md font-medium text-[var(--color-text-black)]">
            {time} | {date}
          </div>

          {/* Title */}
          <h2 className="text-2xl leading-tight text-[var(--color-text-black)] md:text-3xl">
            {title}
          </h2>

          {/* Description */}
          <h2 className="text-2xl leading-tight text-[var(--color-text-black)] md:text-3xl -mt-2.5">
            {description}
          </h2>

          {/* Location */}
          <p className="text-md font-medium text-[var(--color-dark-blue)]">
            Location: {location}
          </p>
        </div>

        {/* Social Icons */}
        {socialLinks && (
          <div className="mt-1">
            <SocialIcons
              instagram={socialLinks.instagram}
              github={socialLinks.github}
              linkedin={socialLinks.linkedin}
              discord={socialLinks.discord}
              size="md"
            />
          </div>
        )}
      </div>
    </div>
  );
}

