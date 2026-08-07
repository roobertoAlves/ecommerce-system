"use client";

/**
 * Invisible component that:
 * 1. On sign-in  → fetches the user's saved cart from Sanity and hydrates the store.
 * 2. On sign-out → saves the current cart to Sanity, then clears the store.
 * 3. On cart change → debounced save to Sanity (500 ms after last change).
 *
 * This ensures every user's cart is persisted server-side and restored on next login,
 * even from a different device.
 */
import { useAuth } from "@clerk/nextjs";
import { useEffect, useRef } from "react";
import { CartItem } from "../../store";
import useStore from "../../store";

// ─── helpers ────────────────────────────────────────────────────────────────

async function fetchSanityCart(): Promise<{ productId: string; quantity: number }[]> {
  try {
    const res = await fetch("/api/cart");
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

async function saveSanityCart(items: CartItem[]): Promise<void> {
  try {
    await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: items.map((i) => ({ productId: i.product._id, quantity: i.quantity })),
      }),
    });
  } catch {
    // silent — cart will be saved on next opportunity
  }
}

// ─── component ──────────────────────────────────────────────────────────────

export default function AuthSync() {
  const { userId } = useAuth();
  const syncUser    = useStore((s) => s.syncUser);
  const hydrateCart = useStore((s) => s.hydrateCart);
  const items       = useStore((s) => s.items);
  const ownerId     = useStore((s) => s.ownerId);

  // Track previous userId so we can detect sign-in / sign-out transitions
  const prevUserIdRef = useRef<string | null | undefined>(undefined);
  // Debounce timer for cart saves
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Flag to avoid saving immediately after we just hydrated
  const justHydratedRef = useRef(false);

  // ── auth state transitions ──────────────────────────────────────────────
  useEffect(() => {
    // Still loading Clerk
    if (userId === undefined) return;

    const prev = prevUserIdRef.current;
    prevUserIdRef.current = userId;

    // Initial render — just record state, don't trigger transitions
    if (prev === undefined) {
      if (userId) {
        // Page loaded while already signed in — hydrate
        (async () => {
          const saved = await fetchSanityCart();
          if (saved.length > 0) {
            // We only have productIds from Sanity; the full Product objects live in
            // the store items that were persisted via localStorage. Try to match them.
            const currentItems = useStore.getState().items;
            const matched: CartItem[] = saved.map(({ productId, quantity }) => {
              const existing = currentItems.find((i) => i.product._id === productId);
              return existing ? { ...existing, quantity } : null;
            }).filter(Boolean) as CartItem[];

            if (matched.length > 0) {
              justHydratedRef.current = true;
              hydrateCart(matched);
            }
          }
          syncUser(userId);
        })();
      } else {
        syncUser(null);
      }
      return;
    }

    // Sign-out or user switch
    if (prev && prev !== userId) {
      // Save the departing user's cart before clearing
      const currentItems = useStore.getState().items;
      saveSanityCart(currentItems);
      syncUser(userId ?? null);

      // If signing into a different account, fetch their cart
      if (userId) {
        (async () => {
          const saved = await fetchSanityCart();
          if (saved.length > 0) {
            // After syncUser the store is empty, so we must fetch full products
            // We rely on the fact that saved items' productIds match what's in Sanity.
            // Map to minimal CartItem shape — product detail is lazy-loaded from Sanity
            // on the cart page anyway; the important thing is the quantity is restored.
            // For a complete restore, fetch product details:
            try {
              const productIds = saved.map((i) => i.productId);
              const res = await fetch("/api/cart/products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ids: productIds }),
              });
              if (res.ok) {
                const products = await res.json();
                const hydrated: CartItem[] = saved.map(({ productId, quantity }) => {
                  const product = products.find((p: { _id: string }) => p._id === productId);
                  return product ? { product, quantity } : null;
                }).filter(Boolean) as CartItem[];
                if (hydrated.length > 0) {
                  justHydratedRef.current = true;
                  hydrateCart(hydrated);
                }
              }
            } catch {
              // ignore — cart just starts empty
            }
          }
        })();
      }
      return;
    }

    // Sign-in (prev was null/undefined, now has a userId)
    if (!prev && userId) {
      (async () => {
        const saved = await fetchSanityCart();
        if (saved.length > 0) {
          try {
            const productIds = saved.map((i) => i.productId);
            const res = await fetch("/api/cart/products", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ ids: productIds }),
            });
            if (res.ok) {
              const products = await res.json();
              const hydrated: CartItem[] = saved.map(({ productId, quantity }) => {
                const product = products.find((p: { _id: string }) => p._id === productId);
                return product ? { product, quantity } : null;
              }).filter(Boolean) as CartItem[];
              if (hydrated.length > 0) {
                justHydratedRef.current = true;
                hydrateCart(hydrated);
              }
            }
          } catch {
            // ignore
          }
        }
        syncUser(userId);
      })();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  // ── debounced cart save ──────────────────────────────────────────────────
  useEffect(() => {
    // Don't save if not signed in
    if (!ownerId) return;

    // Don't save immediately after hydrating (would overwrite with same data)
    if (justHydratedRef.current) {
      justHydratedRef.current = false;
      return;
    }

    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      saveSanityCart(items);
    }, 500);

    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  return null;
}
