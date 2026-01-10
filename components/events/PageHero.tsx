import { ArrowRightIcon } from "@/components/icons";
import { cn } from "@/libs/utils";

interface PageHeroProps {
  title?: string;
  iconClassName?: string;
  containerClassName?: string;
  titleClassName?: string;
}

export default function PageHero({
  title = "Events and Workshops",
  iconClassName,
  containerClassName,
  titleClassName,
}: PageHeroProps) {
  return (
    <div className={cn("md:mb-5 mb-0 flex items-center gap-4 group cursor-pointer", containerClassName)}>
      <h1 className={cn("text-3xl md:text-4xl lg:text-6xl font-medium leading-tight text-text-black font-neue-montreal", titleClassName)}>
        {title}
      </h1>
      <div className="hidden md:flex items-center">
        <ArrowRightIcon
          className={cn("lg:h-12 lg:w-12 w-8 h-8 transition-transform duration-300 ease-out group-hover:translate-x-2", iconClassName)}
        />
      </div>
    </div>
  );
}
