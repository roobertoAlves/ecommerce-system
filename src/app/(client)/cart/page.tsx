"use client";

import Container from "@/components/Container";
import EmptyCart from "@/components/EmptyCart";
import NoAccess from "@/components/NoAccess";
import PriceFormatter from "@/components/PriceFormatter";
import QuantityButtons from "@/components/QuantityButtons";
import Title from "@/components/Title";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useCurrency } from "@/context/CurrencyContext";
import { Address } from "@/sanity.types";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { useAuth, useUser } from "@clerk/nextjs";
import { ShoppingBag, Trash } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { createCheckoutSession, Metadata } from "../../../../actions/createCheckoutSession";
import { SupportedCurrency } from "../../../../actions/currency";
import useStore from "../../../../store";

function OrderSummaryPanel({
  selectedItems, groupedItemsLength, selectedSubTotal, selectedDiscount,
  selectedTotal, rates, currency, loading, onCheckout,
}: {
  selectedItems: Array<{ quantity: number }>;
  groupedItemsLength: number;
  selectedSubTotal: number;
  selectedDiscount: number;
  selectedTotal: number;
  rates: Record<string, number>;
  currency: SupportedCurrency;
  loading: boolean;
  onCheckout: () => void;
}) {
  const t = useTranslations("cart");
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm">
        <span className="text-text-muted">{t("selected")} ({selectedItems.length}/{groupedItemsLength})</span>
        <PriceFormatter amount={selectedSubTotal * rates[currency]} currency={currency} />
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-text-muted">{t("discount")}</span>
        <PriceFormatter amount={selectedDiscount * rates[currency]} currency={currency} />
      </div>
      <Separator />
      <div className="flex items-center justify-between font-semibold text-lg">
        <span className="text-text-primary">{t("total")}</span>
        <PriceFormatter amount={selectedTotal * rates[currency]} currency={currency} className="text-lg font-bold text-primary" />
      </div>
      <Button
        className="w-full rounded-full font-semibold tracking-wide"
        size="lg"
        disabled={loading || selectedItems.length === 0}
        onClick={onCheckout}
      >
        {loading ? t("processing") : selectedItems.length === 0 ? t("selectItemsCheckout") : `${t("checkout")} (${selectedItems.length})`}
      </Button>
    </div>
  );
}

const CartPage = () => {
  const t = useTranslations("cart");
  const { deleteCartProduct, getItemCount, resetCart } = useStore();
  const { currency, rates } = useCurrency();
  const [loading, setLoading] = useState(false);
  const groupedItems = useStore((state) => state.getGroupedItems());
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const [addresses, setAddresses] = useState<Address[] | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(
    () => new Set(groupedItems.map((i) => i.product._id)),
  );

  const currentItemIds = useMemo(() => groupedItems.map((item) => item.product._id), [groupedItems]);
  const visibleSelectedIds = useMemo(
    () => new Set(currentItemIds.filter((id) => selectedIds.has(id))),
    [currentItemIds, selectedIds],
  );
  const allSelected = currentItemIds.length > 0 && visibleSelectedIds.size === currentItemIds.length;
  const someSelected = visibleSelectedIds.size > 0 && !allSelected;

  const toggleAll = () => { if (allSelected) setSelectedIds(new Set()); else setSelectedIds(new Set(currentItemIds)); };
  const toggleItem = (id: string) => {
    setSelectedIds((prev) => { const next = new Set(prev); next.has(id) ? next.delete(id) : next.add(id); return next; });
  };

  const selectedItems = useMemo(
    () => groupedItems.filter((item) => visibleSelectedIds.has(item.product._id)),
    [groupedItems, visibleSelectedIds],
  );
  const selectedSubTotal = useMemo(
    () => selectedItems.reduce((sum, item) => {
      const price = item.product.price ?? 0;
      const disc = ((item.product.discount ?? 0) * price) / 100;
      return sum + (price + disc) * item.quantity;
    }, 0),
    [selectedItems],
  );
  const selectedTotal = useMemo(
    () => selectedItems.reduce((sum, item) => sum + (item.product.price ?? 0) * item.quantity, 0),
    [selectedItems],
  );
  const selectedDiscount = selectedSubTotal - selectedTotal;

  useEffect(() => {
    client.fetch(`*[_type=="address"] | order(publishedAt desc)`).then((data) => {
      setAddresses(data);
      setSelectedAddress(data.find((a: Address) => a.default) ?? data[0] ?? null);
    }).catch(console.error);
  }, []);

  const handleResetCart = () => {
    if (!window.confirm(t("confirmResetCart"))) return;
    resetCart();
    toast.success(t("resetCart"));
  };

  const handleCheckout = async () => {
    if (!selectedItems.length) { toast.error(t("selectItemsCheckout")); return; }
    setLoading(true);
    try {
      const metadata: Metadata = {
        orderNumber: crypto.randomUUID(),
        customerName: user?.fullName ?? "Guest",
        customerEmail: user?.emailAddresses[0]?.emailAddress ?? "Unknown",
        clerkUserId: user?.id ?? "",
        address: selectedAddress,
      };
      const url = await createCheckoutSession(selectedItems, metadata, currency);
      if (url) window.location.href = url;
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  return (
    <div className="bg-bg pb-52 md:pb-10">
      {isSignedIn ? (
        <Container>
          {groupedItems?.length ? (
            <>
              <div className="flex items-center gap-2 py-5">
                <ShoppingBag className="text-primary" />
                <Title>{t("title")}</Title>
              </div>
              <div className="grid lg:grid-cols-3 md:gap-8">
                {/* Cart items */}
                <div className="lg:col-span-2 rounded-lg">
                  <div className="border border-border bg-surface rounded-lg overflow-hidden">
                    {/* Select all header */}
                    <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-bg-secondary">
                      <Checkbox
                        id="select-all"
                        checked={allSelected}
                        data-state={someSelected ? "indeterminate" : allSelected ? "checked" : "unchecked"}
                        onCheckedChange={toggleAll}
                        className="w-5 h-5"
                      />
                      <label htmlFor="select-all" className="text-sm font-semibold cursor-pointer select-none text-text-primary">
                        {t("selectAll")} ({groupedItems.length})
                      </label>
                      {someSelected && (
                        <span className="ml-auto text-xs text-text-muted">{selectedIds.size} {t("selected")}</span>
                      )}
                    </div>

                    {/* Cart rows */}
                    {groupedItems.map(({ product }) => {
                      const itemCount = getItemCount(product._id);
                      const isChecked = selectedIds.has(product._id);
                      return (
                        <div
                          key={product._id}
                          className={`border-b border-border last:border-b-0 flex items-center gap-3 p-2.5 transition-colors ${isChecked ? "bg-surface" : "bg-bg-secondary/40"}`}
                        >
                          <Checkbox
                            checked={isChecked}
                            onCheckedChange={() => toggleItem(product._id)}
                            className="w-5 h-5 shrink-0 self-center"
                          />
                          <div className={`flex flex-1 items-start gap-2 h-36 md:h-44 transition-opacity ${isChecked ? "opacity-100" : "opacity-40"}`}>
                            {product.images && (
                              <Link href={`/product/${product.slug?.current}`} className="border border-border p-0.5 md:p-1 mr-2 rounded-md overflow-hidden group">
                                <Image
                                  src={urlFor(product.images[0]).url()}
                                  alt="product"
                                  width={500}
                                  height={500}
                                  loading="lazy"
                                  className="w-32 md:w-40 h-32 md:h-40 object-cover group-hover:scale-105 transition-transform"
                                />
                              </Link>
                            )}
                            <div className="h-full flex flex-1 flex-col justify-between py-1">
                              <div className="flex flex-col gap-0.5 md:gap-1.5">
                                <h2 className="text-base font-semibold line-clamp-1 text-text-primary">{product.name}</h2>
                                <p className="text-sm capitalize text-text-muted">
                                  {t("variantLabel")}: <span className="font-semibold text-text-primary">{product.variant}</span>
                                </p>
                                <p className="text-sm capitalize text-text-muted">
                                  {t("statusLabel")}: <span className="font-semibold text-text-primary">{product.status}</span>
                                </p>
                              </div>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger
                                    onClick={() => { deleteCartProduct(product._id); toast.success(t("productRemovedToast")); }}
                                    className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-danger transition-colors"
                                  >
                                    <Trash className="w-4 h-4 md:w-5 md:h-5" />
                                    <span className="hidden md:inline text-xs">{t("removeItem")}</span>
                                  </TooltipTrigger>
                                  <TooltipContent className="font-bold bg-danger text-white">
                                    {t("removeFromCart")}
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                          </div>
                          <div className={`flex flex-col items-end justify-between h-36 md:h-44 p-0.5 md:p-1 shrink-0 transition-opacity ${isChecked ? "opacity-100" : "opacity-40"}`}>
                            <PriceFormatter amount={(product.price as number) * itemCount * rates[currency]} currency={currency} className="font-bold text-lg text-primary" />
                            <QuantityButtons product={product} />
                          </div>
                        </div>
                      );
                    })}

                    <div className="px-4 py-3 flex items-center justify-between border-t border-border bg-bg-secondary/40">
                      <Button onClick={handleResetCart} variant="destructive" size="sm" className="font-semibold">
                        {t("resetCart")}
                      </Button>
                      {selectedItems.length < groupedItems.length && (
                        <button
                          onClick={() => setSelectedIds(new Set(groupedItems.map((i) => i.product._id)))}
                          className="text-xs text-primary hover:underline transition-colors"
                        >
                          {t("reselectAll")}
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Summary + address — desktop */}
                <div className="lg:col-span-1">
                  <div className="hidden md:block w-full bg-surface p-6 rounded-lg border border-border">
                    <h2 className="text-xl font-semibold mb-4 text-text-primary">{t("orderSummary")}</h2>
                    <OrderSummaryPanel
                      selectedItems={selectedItems} groupedItemsLength={groupedItems.length}
                      selectedSubTotal={selectedSubTotal} selectedDiscount={selectedDiscount}
                      selectedTotal={selectedTotal} rates={rates} currency={currency}
                      loading={loading} onCheckout={handleCheckout}
                    />
                  </div>

                  {addresses && (
                    <div className="bg-surface rounded-md mt-5 border border-border">
                      <Card>
                        <CardHeader><CardTitle className="text-text-primary">{t("deliveryAddresses")}</CardTitle></CardHeader>
                        <CardContent>
                          <RadioGroup defaultValue={addresses.find((a) => a.default)?._id.toString()}>
                            {addresses.map((address) => (
                              <div
                                key={address._id}
                                onClick={() => setSelectedAddress(address)}
                                className={`flex items-center space-x-2 mb-4 cursor-pointer ${selectedAddress?._id === address._id ? "text-primary" : "text-text-primary"}`}
                              >
                                <RadioGroupItem value={address._id.toString()} />
                                <Label className="grid gap-1.5 flex-1 cursor-pointer">
                                  <span className="font-semibold">{address.name}</span>
                                  <span className="text-sm text-text-muted">
                                    {address.address}, {address.city}, {address.state} {address.zip}
                                  </span>
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                          <Button variant="outline" className="w-full mt-4">{t("addNewAddress")}</Button>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <EmptyCart />
          )}

          {/* Mobile sticky summary */}
          {groupedItems?.length > 0 && (
            <div className="md:hidden fixed bottom-0 left-0 w-full bg-surface pt-2 shadow-[0_-4px_16px_rgba(0,0,0,0.1)] border-t border-border z-40">
              <div className="p-4">
                <p className="text-sm font-semibold text-text-primary mb-3">{t("orderSummary")}</p>
                <OrderSummaryPanel
                  selectedItems={selectedItems} groupedItemsLength={groupedItems.length}
                  selectedSubTotal={selectedSubTotal} selectedDiscount={selectedDiscount}
                  selectedTotal={selectedTotal} rates={rates} currency={currency}
                  loading={loading} onCheckout={handleCheckout}
                />
              </div>
            </div>
          )}
        </Container>
      ) : (
        <NoAccess />
      )}
    </div>
  );
};

export default CartPage;
