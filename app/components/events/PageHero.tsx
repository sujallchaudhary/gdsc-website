import { ArrowRightIcon } from '@/app/components/icons';

interface PageHeroProps {
  title?: string;
}

export default function PageHero({ title = "Events and Workshops" }: PageHeroProps) {
  return (
    <div className="mb-10 flex items-center gap-4 group cursor-pointer">
      <h1 className="text-3xl font-medium leading-tight text-[var(--color-text-black)] font-[var(--font-neue-montreal)] md:text-4xl lg:text-5xl">
        {title}
      </h1>
      <div className="hidden md:flex items-center">
        <ArrowRightIcon
          className="h-12 w-12 transition-transform duration-300 ease-out group-hover:translate-x-2"
          style={{ color: 'var(--color-primary-yellow)' }}
        />
      </div>
    </div>
  );
}
