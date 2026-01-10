import { SVGProps } from 'react';

interface IconProps extends SVGProps<SVGSVGElement> {
  className?: string;
}

export function XIcon({ className, ...props }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 52 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      {/* <circle cx="26" cy="26" r="26" fill="white"/> */}
      <path 
        d="M32.8 14.4H37.28L27.72 25.36L39 37.6H30.88L24.36 29.2L16.96 37.6H12.48L22.68 26L12 14.4H20.32L26.24 22.08L32.8 14.4ZM31.28 35.6H33.68L19.84 16.88H17.28L31.28 35.6Z" 
        fill="currentColor"
      />
    </svg>
  );
}

export default XIcon;