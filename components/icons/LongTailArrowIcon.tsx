import { cn } from "@/libs/utils";

export function LongTailArrowIcon({className}: {className?: string}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
    //   width="90"
    //   height="80"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#4285F4"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(" lucide lucide-move-right-icon lucide-move-right", className)}
    >
      <path d="M18 8L22 12L18 16" />
      <path d="M2 12H22" />
    </svg>
  );
}
