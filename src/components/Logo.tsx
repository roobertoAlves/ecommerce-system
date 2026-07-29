import { cn } from "@/lib/utils";
import Link from "next/link";

function Logo({
  className,
  spanDesign,
}: {
  className?: string;
  spanDesign?: string;
}) {
  return (
    <Link href={"/"}>
      <h2
        className={cn(
          "text-2xl text-primary-dark font-black tracking-wider uppercase transition-colors duration-300 group font-sans hover:text-primary",
          className,
        )}
      >
        Shopif
        <span
          className={cn(
            "text-secondary group-hover:text-accent transition-colors duration-300",
            spanDesign,
          )}
        >
          y
        </span>
      </h2>
    </Link>
  );
}

export default Logo;
