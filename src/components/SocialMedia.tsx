import { cn } from "@/lib/utils";
import {
  GithubLogoIcon,
  LinkedinLogoIcon,
  XLogoIcon,
  YoutubeLogoIcon,
} from "@phosphor-icons/react";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface Props {
  className?: string;
  iconClassName?: string;
  tooltipClassName?: string;
}

const socialLink = [
  {
    title: "Youtube",
    href: "https://www.youtube.com/@shopify",
    icon: <YoutubeLogoIcon className="w-5 h-5" />,
  },
  {
    title: "Github",
    href: "https://github.com/shopify",
    icon: <GithubLogoIcon className="w-5 h-5" />,
  },
  {
    title: "Twitter/X",
    href: "https://twitter.com/shopify",
    icon: <XLogoIcon className="w-5 h-5" />,
  },
  {
    title: "Linkedin",
    href: "https://www.linkedin.com/company/shopify",
    icon: <LinkedinLogoIcon className="w-5 h-5" />,
  },
];

const SocialMedia = ({ className, iconClassName, tooltipClassName }: Props) => {
  return (
    <TooltipProvider>
      <div className={cn("flex items-center gap-3.5", className)}>
        {socialLink?.map((item) => (
          <Tooltip key={item?.title}>
            <TooltipTrigger
              className={cn(
                "p-2 border border-border rounded-full text-text-muted hover:text-white hover:bg-primary hover:border-primary transition-all duration-300",
                iconClassName,
              )}
            >
              <Link target="_blank" rel="noopener noreferrer" href={item?.href}>
                {item?.icon}
              </Link>
            </TooltipTrigger>
            <TooltipContent className={cn("bg-primary text-white border-none text-xs font-medium", tooltipClassName)}>
              {item?.title}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
};

export default SocialMedia;
