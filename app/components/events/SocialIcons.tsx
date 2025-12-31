import {
  InstagramIcon,
  GitHubIcon,
  LinkedInIcon,
  DiscordIcon
} from '@/app/components/icons';

interface SocialIconsProps {
  instagram?: string;
  github?: string;
  linkedin?: string;
  discord?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function SocialIcons({
  instagram,
  github,
  linkedin,
  discord,
  size = 'md'
}: SocialIconsProps) {
  const sizeClasses = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11'
  };

  const iconSize = sizeClasses[size];

  return (
    <div className="flex items-center gap-3">
      {instagram && (
        <a
          href={instagram}
          target="_blank"
          rel="noopener noreferrer"
          className={`${iconSize} flex items-center justify-center transition-opacity hover:opacity-80`}
          aria-label="Instagram"
        >
          <InstagramIcon
            className="w-full h-full"
            style={{ color: 'var(--color-primary-yellow)' }}
          />
        </a>
      )}
      {github && (
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className={`${iconSize} flex items-center justify-center transition-opacity hover:opacity-80`}
          aria-label="GitHub"
        >
          <GitHubIcon
            className="w-full h-full"
            style={{ color: 'var(--color-primary-green)' }}
          />
        </a>
      )}
      {linkedin && (
        <a
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className={`${iconSize} flex items-center justify-center transition-opacity hover:opacity-80`}
          aria-label="LinkedIn"
        >
          <LinkedInIcon
            className="w-full h-full"
            style={{ color: 'var(--color-primary-blue)' }}
          />
        </a>
      )}
      {discord && (
        <a
          href={discord}
          target="_blank"
          rel="noopener noreferrer"
          className={`${iconSize} flex items-center justify-center transition-opacity hover:opacity-80`}
          aria-label="Discord"
        >
          <DiscordIcon
            className="w-full h-full"
            style={{ color: 'var(--color-primary-red)' }}
          />
        </a>
      )}
    </div>
  );
}
