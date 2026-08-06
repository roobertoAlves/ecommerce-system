"use client";
import { cn } from "@/lib/utils";
import { Product } from "@/sanity.types";
import { Minus, Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";
import useStore from "../../store";
import { Button } from "./ui/button";

const QuantityButtons = ({ product, className }: { product: Product; className?: string }) => {
  const t = useTranslations("cart");
  const { addItem, removeItem, getItemCount } = useStore();
  const itemCount = getItemCount(product?._id);
  const isOutOfStock = product?.stock === 0;

  const handleRemove = () => {
    removeItem(product?._id);
    toast.success(itemCount > 1 ? t("quantityDecreased") : t("productRemovedToast"));
  };

  const handleAdd = () => {
    if ((product?.stock as number) > itemCount) {
      addItem(product);
      toast.success(t("quantityIncreased"));
    } else {
      toast.error(t("cantAddMore"));
    }
  };

  return (
    <div className={cn("flex items-center gap-1 pb-1 text-base", className)}>
      <Button
        onClick={handleRemove}
        variant="outline"
        size="icon"
        disabled={itemCount === 0 || isOutOfStock}
        className="w-6 h-6 border-[1px] hover:bg-primary/10 hoverEffect"
      >
        <Minus />
      </Button>
      <span className="font-semibold text-sm w-6 text-center text-text-primary">{itemCount}</span>
      <Button
        onClick={handleAdd}
        variant="outline"
        size="icon"
        disabled={isOutOfStock}
        className="w-6 h-6 border-[1px] hover:bg-primary/10 hoverEffect"
      >
        <Plus />
      </Button>
    </div>
  );
};

export default QuantityButtons;
