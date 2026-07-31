import { cn } from "@/lib/utils";
import { Product } from "@/sanity.types";
import { Heart } from "lucide-react";

const AddToWishlistButton = ({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) => {
  return (
    <div className={cn("absolute top-2 right-2 z-10", className)}>
      <button className="p-2.5 rounded-full bg-surface border border-border text-accent hover:bg-accent hover:text-primary-foreground hover:border-accent hoverEffect">
        <Heart size={15} />
      </button>
    </div>
  );
};

export default AddToWishlistButton;
