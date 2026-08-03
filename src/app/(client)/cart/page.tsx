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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Address } from "@/sanity.types";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { useAuth, useUser } from "@clerk/nextjs";
import { ShoppingBag, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import {
  createCheckoutSession,
  Metadata,
} from "../../../../actions/createCheckoutSession";
import { EXCHANGE_RATES, SupportedCurrency } from "../../../../actions/currency";
import { getExchangeRates } from "../../../../actions/getExchangeRates";
import useStore from "../../../../store";

const CartPage = () => {
  const { deleteCartProduct, getItemCount, resetCart } = useStore();

  const [loading, setLoading] = useState(false);
  const [currency, setCurrency] = useState<SupportedCurrency>("usd");
  const [rates, setRates] = useState(EXCHANGE_RATES);
  const groupedItems = useStore((state) => state.getGroupedItems());
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const [addresses, setAddresses] = useState<Address[] | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

 const [selectedIds, setSelectedIds] = useState<Set<string>>(
    () => new Set(groupedItems.map((i) => i.product._id)),
  );

  useEffect(() => {
    setSelectedIds((prev) => {
      const currentIds = new Set(groupedItems.map((i) => i.product._id));
      const next = new Set<string>();
      currentIds.forEach((id) => {
        next.add(id); // new items start checked; existing ones keep their state
        if (!prev.has(id)) next.add(id);
      });
      prev.forEach((id) => {
        if (currentIds.has(id)) next.add(id);
      });
      return next;
    });
  }, [groupedItems.length]);

  const allSelected =
    groupedItems.length > 0 && selectedIds.size === groupedItems.length;
  const someSelected = selectedIds.size > 0 && !allSelected;

  const toggleAll = () => {
    if (allSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(groupedItems.map((i) => i.product._id)));
    }
  };

  const toggleItem = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  // ── Items that will go to checkout ──────────────────────────────────────────
  const selectedItems = useMemo(
    () => groupedItems.filter((i) => selectedIds.has(i.product._id)),
    [groupedItems, selectedIds],
  );

  const selectedSubTotal = useMemo(
    () =>
      selectedItems.reduce((sum, item) => {
        const price = item.product.price ?? 0;
        const discount = ((item.product.discount ?? 0) * price) / 100;
        return sum + (price + discount) * item.quantity;
      }, 0),
    [selectedItems],
  );

  const selectedTotal = useMemo(
    () =>
      selectedItems.reduce(
        (sum, item) => sum + (item.product.price ?? 0) * item.quantity,
        0,
      ),
    [selectedItems],
  );

  const selectedDiscount = selectedSubTotal - selectedTotal;

  useEffect(() => {
    getExchangeRates().then(setRates);
  }, []);

  useEffect(() => {
    const fetchAddresses = async () => {
      setLoading(true);
      try {
        const query = `*[_type=="address"] | order(publishedAt desc)`;
        const data = await client.fetch(query);
        setAddresses(data);
        const defaultAddress = data.find((addr: Address) => addr.default);
        if (defaultAddress) {
          setSelectedAddress(defaultAddress);
        } else if (data.length > 0) {
          setSelectedAddress(data[0]);
        }
      } catch (error) {
        console.error("Error fetching addresses:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAddresses();
  }, []);

  const handleResetCart = () => {
    const confirmed = window.confirm(
      "Are you sure you want to reset the cart? This action cannot be undone.",
    );
    if (confirmed) {
      resetCart();
      toast.success("Cart reset successfully!");
    }
  };

  const handleCheckout = async () => {
    if (selectedItems.length === 0) {
      toast.error("Select at least one item to proceed.");
      return;
    }
    setLoading(true);
    try {
      const metadata: Metadata = {
        orderNumber: crypto.randomUUID(),
        customerName: user?.fullName ?? "Guest",
        customerEmail: user?.emailAddresses[0]?.emailAddress ?? "Unknown",
        clerkUserId: user?.id ?? "",
        address: selectedAddress,
      };

      const checkoutUrl = await createCheckoutSession(
        selectedItems,
        metadata,
        currency,
      );
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    } finally {
      setLoading(false);
    }
  };

  const OrderSummary = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-500">
          Selected items ({selectedItems.length}/{groupedItems.length})
        </span>
        <PriceFormatter
          amount={selectedSubTotal * rates[currency]}
          currency={currency}
        />
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-500">Discount</span>
        <PriceFormatter
          amount={selectedDiscount * rates[currency]}
          currency={currency}
        />
      </div>
      <Separator />
      <div className="flex items-center justify-between font-semibold text-lg">
        <span>Total</span>
        <PriceFormatter
          amount={selectedTotal * rates[currency]}
          currency={currency}
          className="text-lg font-bold text-black"
        />
      </div>
      <Button
        className="w-full rounded-full font-semibold tracking-wide hoverEffect"
        size="lg"
        disabled={loading || selectedItems.length === 0}
        onClick={handleCheckout}
      >
        {loading
          ? "Processing..."
          : selectedItems.length === 0
            ? "Select items to checkout"
            : `Checkout (${selectedItems.length} item${selectedItems.length > 1 ? "s" : ""})`}
      </Button>
    </div>
  );

  return (
    <div className="bg-gray-50 pb-52 md:pb-10">
      {isSignedIn ? (
        <Container>
          <div>
            {groupedItems?.length ? (
              <>
                <div className="flex items-center gap-2 py-5">
                  <ShoppingBag className="text-darkColor" />
                  <Title>Shopping Cart</Title>
                  <div className="ml-auto flex gap-1">
                    {(["usd", "eur", "brl"] as SupportedCurrency[]).map((c) => (
                      <button
                        key={c}
                        onClick={() => setCurrency(c)}
                        className={`px-3 py-1 text-xs rounded-full border font-semibold uppercase hoverEffect ${
                          currency === c
                            ? "bg-darkColor text-white border-darkColor"
                            : "bg-white text-darkColor border-gray-300"
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid lg:grid-cols-3 md:gap-8">
                  <div className="lg:col-span-2 rounded-lg">
                    <div className="border bg-white rounded-md">

                      <div className="flex items-center gap-3 px-4 py-3 border-b bg-gray-50 rounded-t-md">
                        <Checkbox
                          id="select-all"
                          checked={allSelected}
                          data-state={
                            someSelected
                              ? "indeterminate"
                              : allSelected
                                ? "checked"
                                : "unchecked"
                          }
                          onCheckedChange={toggleAll}
                          aria-label="Select all items"
                          className="w-5 h-5"
                        />
                        <label
                          htmlFor="select-all"
                          className="text-sm font-semibold cursor-pointer select-none"
                        >
                          Select All ({groupedItems.length})
                        </label>
                        {someSelected && (
                          <span className="ml-auto text-xs text-gray-400">
                            {selectedIds.size} selected
                          </span>
                        )}
                      </div>

                      {/* Product rows */}
                      {groupedItems?.map(({ product }) => {
                        const itemCount = getItemCount(product?._id);
                        const isChecked = selectedIds.has(product._id);
                        return (
                          <div
                            key={product._id}
                            className={`border-b last:border-b-0 flex items-center gap-3 p-2.5 transition-colors ${
                              isChecked ? "bg-white" : "bg-gray-50/60"
                            }`}
                          >
                            <Checkbox
                              id={`item-${product._id}`}
                              checked={isChecked}
                              onCheckedChange={() => toggleItem(product._id)}
                              aria-label={`Select ${product.name}`}
                              className="w-5 h-5 shrink-0 self-center"
                            />

                            <div
                              className={`flex flex-1 items-start gap-2 h-36 md:h-44 transition-opacity ${
                                isChecked ? "opacity-100" : "opacity-50"
                              }`}
                            >
                              {product?.images && (
                                <Link
                                  href={`/product/${product?.slug?.current}`}
                                  className="border p-0.5 md:p-1 mr-2 rounded-md overflow-hidden group"
                                >
                                  <Image
                                    src={urlFor(product?.images[0]).url()}
                                    alt="productImage"
                                    width={500}
                                    height={500}
                                    loading="lazy"
                                    className="w-32 md:w-40 h-32 md:h-40 object-cover group-hover:scale-105 hoverEffect"
                                  />
                                </Link>
                              )}
                              <div className="h-full flex flex-1 flex-col justify-between py-1">
                                <div className="flex flex-col gap-0.5 md:gap-1.5">
                                  <h2 className="text-base font-semibold line-clamp-1">
                                    {product?.name}
                                  </h2>
                                  <p className="text-sm capitalize">
                                    Variant:{" "}
                                    <span className="font-semibold">
                                      {product?.variant}
                                    </span>
                                  </p>
                                  <p className="text-sm capitalize">
                                    Status:{" "}
                                    <span className="font-semibold">
                                      {product?.status}
                                    </span>
                                  </p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger>
                                        <button
                                          onClick={() => {
                                            deleteCartProduct(product?._id);
                                            toast.success(
                                              "Product deleted successfully",
                                            );
                                          }}
                                          className="flex items-center gap-1 text-sm text-gray-400 hover:text-red-600 hoverEffect"
                                          aria-label="Remove item"
                                        >
                                          <Trash className="w-4 h-4 md:w-5 md:h-5" />
                                          <span className="hidden md:inline text-xs">Remove</span>
                                        </button>
                                      </TooltipTrigger>
                                      <TooltipContent className="font-bold bg-red-600">
                                        Remove from cart
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                </div>
                              </div>
                            </div>

                            <div
                              className={`flex flex-col items-end justify-between h-36 md:h-44 p-0.5 md:p-1 shrink-0 transition-opacity ${
                                isChecked ? "opacity-100" : "opacity-50"
                              }`}
                            >
                              <PriceFormatter
                                amount={
                                  (product?.price as number) *
                                  itemCount *
                                  rates[currency]
                                }
                                currency={currency}
                                className="font-bold text-lg"
                              />
                              <QuantityButtons product={product} />
                            </div>
                          </div>
                        );
                      })}

                      <div className="px-4 py-3 flex items-center justify-between border-t">
                        <Button
                          onClick={handleResetCart}
                          className="font-semibold"
                          variant="destructive"
                          size="sm"
                        >
                          Reset Cart
                        </Button>
                        {selectedItems.length < groupedItems.length && (
                          <button
                            onClick={() =>
                              setSelectedIds(
                                new Set(groupedItems.map((i) => i.product._id)),
                              )
                            }
                            className="text-xs text-blue-600 hover:underline hoverEffect"
                          >
                            Re-select all
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="lg:col-span-1">
                      {/* Desktop order summary */}
                      <div className="hidden md:block w-full bg-white p-6 rounded-lg border">
                        <h2 className="text-xl font-semibold mb-4">
                          Order Summary
                        </h2>
                        <OrderSummary />
                      </div>

                      {/* Delivery addresses */}
                      {addresses && (
                        <div className="bg-white rounded-md mt-5">
                          <Card>
                            <CardHeader>
                              <CardTitle>Delivery Addresses</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <RadioGroup
                                defaultValue={addresses
                                  ?.find((addr) => addr.default)
                                  ?._id.toString()}
                              >
                                {addresses?.map((address) => (
                                  <div
                                    key={address._id}
                                    onClick={() => setSelectedAddress(address)}
                                    className={`flex items-center space-x-2 mb-4 cursor-pointer ${
                                      selectedAddress?._id === address?._id &&
                                      "text-shop_dark_green"
                                    }`}
                                  >
                                    <RadioGroupItem
                                      value={address._id.toString()}
                                    />
                                    <Label
                                      htmlFor={`address-${address?._id}`}
                                      className="grid gap-1.5 flex-1"
                                    >
                                      <span className="font-semibold">
                                        {address?.name}
                                      </span>
                                      <span className="text-sm text-black/60">
                                        {address?.address}, {address?.city},{" "}
                                        {address?.state} {address?.zip}
                                      </span>
                                    </Label>
                                  </div>
                                ))}
                              </RadioGroup>
                              <Button variant="outline" className="w-full mt-4">
                                Add New Address
                              </Button>
                            </CardContent>
                          </Card>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="md:hidden fixed bottom-0 left-0 w-full bg-white pt-2 shadow-[0_-4px_12px_rgba(0,0,0,0.08)]">
                    <div className="bg-white p-4 rounded-t-xl border-t mx-0">
                      <h2 className="font-semibold mb-3">Order Summary</h2>
                      <OrderSummary />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <EmptyCart />
            )}
          </div>
        </Container>
      ) : (
        <NoAccess />
      )}
    </div>
  );
};

export default CartPage;
