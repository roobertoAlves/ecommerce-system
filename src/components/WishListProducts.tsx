"use client";
import { Product } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import { Heart, X } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import useStore from "../../store";
import AddToCartButton from "./AddToCartButton";
import Container from "./Container";
import PriceFormatter from "./PriceFormatter";
import { Button, buttonVariants } from "./ui/button";

const WishListProducts = () => {
  const t = useTranslations("wishlist");
  const tCommon = useTranslations("common");
  const [visibleProducts, setVisibleProducts] = useState(7);
  const { favoriteProduct, removeFromFavorite, resetFavorite } = useStore();

  const handleResetWishlist = () => {
    if (window.confirm(t("resetConfirm"))) {
      resetFavorite();
      toast.success(t("resetSuccess"));
    }
  };

  return (
    <Container>
      {favoriteProduct?.length > 0 ? (
        <>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm font-poppins">
              <thead>
                <tr className="bg-bg-secondary text-text-muted uppercase text-xs tracking-wider">
                  <th className="p-3 text-left">{t("product")}</th>
                  <th className="p-3 text-left hidden md:table-cell">{t("category")}</th>
                  <th className="p-3 text-left hidden md:table-cell">{t("type")}</th>
                  <th className="p-3 text-left hidden md:table-cell">{t("status")}</th>
                  <th className="p-3 text-left">{t("price")}</th>
                  <th className="p-3 text-left">{t("action")}</th>
                </tr>
              </thead>
              <tbody>
                {favoriteProduct.slice(0, visibleProducts).map((product: Product) => (
                  <tr key={product._id} className="border-b border-border hover:bg-bg-secondary/50 transition-colors">
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <X
                          onClick={() => { removeFromFavorite(product._id); toast.success(t("itemRemoved")); }}
                          size={16}
                          className="text-text-muted hover:text-danger hover:cursor-pointer hoverEffect shrink-0"
                        />
                        {product.images && (
                          <Link href={`/product/${product.slug?.current}`} className="border border-border rounded-md group hidden md:inline-flex shrink-0">
                            <Image src={urlFor(product.images[0]).url()} alt="product" width={80} height={80} className="rounded-md group-hover:scale-105 hoverEffect h-16 w-16 object-contain" />
                          </Link>
                        )}
                        <p className="line-clamp-1 text-text-primary font-medium">{product.name}</p>
                      </div>
                    </td>
                    <td className="p-3 hidden md:table-cell">
                      <p className="capitalize line-clamp-1 text-sm text-text-muted">
                        {(product.categories as unknown as string[] | null)?.join(", ")}
                      </p>
                    </td>
                    <td className="p-3 capitalize text-text-muted hidden md:table-cell">{product.variant}</td>
                    <td className="p-3 hidden md:table-cell">
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${(product.stock as number) > 0 ? "bg-success/10 text-success" : "bg-danger/10 text-danger"}`}>
                        {(product.stock as number) > 0 ? tCommon("inStock") : tCommon("outOfStock")}
                      </span>
                    </td>
                    <td className="p-3"><PriceFormatter amount={product.price} /></td>
                    <td className="p-3"><AddToCartButton product={product} className="w-full" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-3 my-6">
            <div className="flex items-center justify-center gap-3">
              {visibleProducts < favoriteProduct.length ? (
                <Button variant="outline" onClick={() => setVisibleProducts((p) => Math.min(p + 5, favoriteProduct.length))} className="px-8 rounded-full border-primary/40 text-primary hover:bg-primary/5 hover:border-primary font-semibold">
                  {tCommon("loadMore")}
                </Button>
              ) : visibleProducts > 7 && (
                <Button onClick={() => setVisibleProducts(7)} variant="outline" className="px-8 rounded-full border-border text-text-muted hover:bg-bg-secondary font-semibold">
                  {tCommon("loadLess")}
                </Button>
              )}
            </div>
            {favoriteProduct.length > 0 && (
              <Button onClick={handleResetWishlist} variant="destructive" size="sm" className="px-6 rounded-full font-semibold self-start">
                {t("reset")}
              </Button>
            )}
          </div>
        </>
      ) : (
        <div className="flex min-h-[400px] flex-col items-center justify-center space-y-4">
          <Heart className="h-12 w-12 text-muted-foreground" strokeWidth={1.5} />
          <h2 className="text-2xl font-semibold tracking-tight">{t("empty")}</h2>
          <p className="text-sm text-muted-foreground">{t("emptyDesc")}</p>
          <Link href="/shop" className={buttonVariants()}>{tCommon("continueShopping")}</Link>
        </div>
      )}
    </Container>
  );
};

export default WishListProducts;
