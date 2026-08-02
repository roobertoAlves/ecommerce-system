"use client";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import useStore from "../../store";

const CartIcon = () => {
  const { items } = useStore();
  return (
    <Link href={"/cart"} className="group relative">
      <ShoppingBag className="w-6 h-6 text-text-muted group-hover:text-primary hoverEffect" />
      <span className="absolute -top-1.5 -right-1.5 bg-primary text-primary-foreground min-w-[18px] h-[18px] rounded-full text-[10px] font-bold flex items-center justify-center px-0.5">
        {items?.length ? items.length : 0}
      </span>
    </Link>
  );
};

export default CartIcon;
