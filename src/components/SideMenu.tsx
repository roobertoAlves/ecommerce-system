"use client";
import { headerData } from "@/constants/data";
import { useOutsideClck } from "@/hooks";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import SocialMedia from "./SocialMedia";

interface SideBarProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideMenu: React.FC<SideBarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const sidebarRef = useOutsideClck<HTMLDivElement>(onClose);
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 transition-all duration-300",
        isOpen ? "visible" : "invisible",
      )}
    >
      <div
        className={cn(
          "absolute inset-0 bg-black/50 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0",
        )}
        onClick={onClose}
      />
      <div
        className={cn(
          "absolute inset-y-0 left-0 min-w-72 max-w-96 bg-surface h-screen p-10 border-r border-r-primary/30 flex flex-col gap-6 transition-transform duration-300",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between gap-5">
          <Logo />
          <button
            onClick={onClose}
            className="text-text-muted hover:text-primary transition-colors duration-300"
          >
            <X />
          </button>
        </div>
        <div className="flex flex-col space-y-3.5 font-semibold tracking-wide">
          {headerData?.map((item) => (
            <Link
              href={item?.href}
              key={item?.title}
              onClick={onClose}
              className={cn(
                "hover:text-primary transition-colors duration-300",
                pathname === item?.href ? "text-primary font-semibold" : "text-text-muted",
              )}
            >
              {item?.title}
            </Link>
          ))}
        </div>
        <SocialMedia />
      </div>
    </div>
  );
};

export default SideMenu;
