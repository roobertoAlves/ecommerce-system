"use client";
import { headerData } from "@/constants/data";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const HeaderMenu = () => {
  const pathname = usePathname();
  return (
    <div className="hidden md:inline-flex items-center justify-center gap-7 text-sm capitalize font-normal text-text-muted">
      {headerData?.map((item) => {
        const isActive = pathname === item?.href;
        return (
          <Link
            key={item?.title}
            href={item?.href}
            className={cn(
              "relative group transition-colors duration-300 hover:text-primary-dark",
              isActive ? "text-primary font-semibold" : "text-text-muted",
            )}
          >
            {item?.title}
            <span
              className={cn(
                "absolute -bottom-0.5 left-0 h-0.5 transition-all duration-300",
                isActive
                  ? "w-full bg-primary"
                  : "w-0 bg-secondary group-hover:w-full",
              )}
            />
          </Link>
        );
      })}
    </div>
  );
};

export default HeaderMenu;
