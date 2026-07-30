"use client";
import { cn } from "@/lib/utils";
import {
  GithubLogoIcon,
  LinkedinLogoIcon,
  XLogoIcon,
  YoutubeLogoIcon,
} from "@phosphor-icons/react";
import Link from "next/link";
import { useState } from "react";

interface Props {
  className?: string;
  iconClassName?: string;
  tooltipClassName?: string;
}

const socialLink = [
  { title: "Youtube", href: "https://www.youtube.com/@shopify", icon: <YoutubeLogoIcon className="w-5 h-5" /> },
  { title: "Github", href: "https://github.com/shopify", icon: <GithubLogoIcon className="w-5 h-5" /> },
  { title: "Twitter/X", href: "https://twitter.com/shopify", icon: <XLogoIcon className="w-5 h-5" /> },
  { title: "Linkedin", href: "https://www.linkedin.com/company/shopify", icon: <LinkedinLogoIcon className="w-5 h-5" /> },
];

const SocialMedia = ({ className, iconClassName, tooltipClassName }: Props) => {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className={cn("flex items-center gap-3.5", className)}>
      {socialLink.map((item) => (
        <div
          key={item.title}
          className="relative inline-flex"
          onPointerEnter={() => setHovered(item.title)}
          onPointerLeave={() => setHovered(null)}
        >
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href={item.href}
            className={cn(
              "flex items-center justify-center p-2 border border-border rounded-full text-text-muted hover:text-white hover:bg-primary hover:border-primary transition-all duration-300",
              iconClassName,
            )}
          >
            {item.icon}
          </Link>
          {hovered === item.title && (
            <span
              className={cn(
                "absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded bg-primary px-2 py-1 text-xs font-medium text-white whitespace-nowrap z-50 pointer-events-none",
                tooltipClassName,
              )}
            >
              {item.title}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default SocialMedia;
