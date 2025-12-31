import { SVGProps } from 'react';

interface IconProps extends SVGProps<SVGSVGElement> {
  className?: string;
}

export function ArrowRightIcon({ className, ...props }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 69 69"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M64.1902 37.182C65.9475 35.4246 65.9475 32.5754 64.1902 30.818L35.5524 2.18019C33.795 0.422836 30.9458 0.422836 29.1884 2.18019C27.431 3.93755 27.431 6.7868 29.1884 8.54416L54.6442 34L29.1884 59.4558C27.431 61.2132 27.431 64.0624 29.1884 65.8198C30.9458 67.5772 33.795 67.5772 35.5524 65.8198L64.1902 37.182ZM0 34V38.5H61.0082V34V29.5H0V34Z"
        fill="currentColor"
      />
    </svg>
  );
}

