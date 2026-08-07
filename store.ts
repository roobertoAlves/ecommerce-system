import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Product } from "./sanity.types";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface StoreState {
  items: CartItem[];
  favoriteProduct: Product[];
  /** The Clerk user ID this store snapshot belongs to. */
  ownerId: string | null;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  deleteCartProduct: (productId: string) => void;
  resetCart: () => void;
  getTotalPrice: () => number;
  getSubTotalPrice: () => number;
  getItemCount: (productId: string) => number;
  getGroupedItems: () => CartItem[];
  addToFavorite: (product: Product) => Promise<void>;
  removeFromFavorite: (productId: string) => void;
  resetFavorite: () => void;
  /**
   * Call this when the auth state changes (sign-in / sign-out).
   * If the stored ownerId differs from the incoming userId, the cart and
   * wishlist are cleared and re-attributed to the new user.
   */
  syncUser: (userId: string | null) => void;
  /**
   * Replace the current cart items with a server-fetched snapshot.
   * Called after login to restore the user's saved cart from Sanity.
   */
  hydrateCart: (items: CartItem[]) => void;
}

const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      items: [],
      favoriteProduct: [],
      ownerId: null,

      syncUser: (userId) => {
        const current = get().ownerId;
        // Same user or still loading — do nothing
        if (current === userId) return;
        // Different user (or signed out): wipe cart and wishlist
        set({ items: [], favoriteProduct: [], ownerId: userId });
      },

      addItem: (product) =>
        set((state) => {
          const existingItem = state.items.find((item) => item.product._id === product._id);
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.product._id === product._id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item,
              ),
            };
          }
          return { items: [...state.items, { product, quantity: 1 }] };
        }),

      removeItem: (productId) =>
        set((state) => ({
          items: state.items.reduce((acc, item) => {
            if (item.product._id === productId) {
              if (item.quantity > 1) acc.push({ ...item, quantity: item.quantity - 1 });
            } else {
              acc.push(item);
            }
            return acc;
          }, [] as CartItem[]),
        })),

      deleteCartProduct: (productId) =>
        set((state) => ({
          items: state.items.filter(({ product }) => product?._id !== productId),
        })),

      resetCart: () => set({ items: [] }),

      getTotalPrice: () =>
        get().items.reduce(
          (total, item) => total + (item.product.price ?? 0) * item.quantity,
          0,
        ),

      getSubTotalPrice: () =>
        get().items.reduce((total, item) => {
          const price = item.product.price ?? 0;
          const discount = ((item.product.discount ?? 0) * price) / 100;
          return total + (price + discount) * item.quantity;
        }, 0),

      getItemCount: (productId) => {
        const item = get().items.find((item) => item.product._id === productId);
        return item ? item.quantity : 0;
      },

      getGroupedItems: () => get().items,

      addToFavorite: (product: Product) =>
        new Promise<void>((resolve) => {
          set((state: StoreState) => {
            const isFavorite = state.favoriteProduct.some((item) => item._id === product._id);
            return {
              favoriteProduct: isFavorite
                ? state.favoriteProduct.filter((item) => item._id !== product._id)
                : [...state.favoriteProduct, { ...product }],
            };
          });
          resolve();
        }),

      removeFromFavorite: (productId: string) => {
        set((state: StoreState) => ({
          favoriteProduct: state.favoriteProduct.filter((item) => item?._id !== productId),
        }));
      },

      resetFavorite: () => set({ favoriteProduct: [] }),

      hydrateCart: (items: CartItem[]) => set({ items }),
    }),
    {
      name: "cart-store",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useStore;
