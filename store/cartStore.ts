// store/cartStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'; // Import persist middleware

// Define the structure of a single item in the cart
export interface CartItem {
  id: string; // Product ID
  name: string;
  price: string; // Keep as string for now, parse when calculating totals
  image?: string; // Optional image path
  quantity: number;
}

// Define the state structure and actions
interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void; // Add item or increment quantity
  removeItem: (itemId: string) => void; // Remove item completely
  increaseQuantity: (itemId: string) => void;
  decreaseQuantity: (itemId: string) => void; // Decrease quantity, remove if 0
  clearCart: () => void;
}

// Create the store with persist middleware
export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [], // Initial state: empty cart

      // Action to add an item or increment its quantity
      addItem: (newItem) => {
        const currentItems = get().items;
        const existingItemIndex = currentItems.findIndex((item) => item.id === newItem.id);

        if (existingItemIndex !== -1) {
          // Item already exists, increment quantity
          const updatedItems = [...currentItems];
          updatedItems[existingItemIndex].quantity += 1;
          set({ items: updatedItems });
        } else {
          // Item is new, add it with quantity 1
          set({ items: [...currentItems, { ...newItem, quantity: 1 }] });
        }
      },

      // Action to remove an item completely
      removeItem: (itemId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== itemId),
        }));
      },

      // Action to increase quantity
      increaseQuantity: (itemId) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
          ),
        }));
      },

      // Action to decrease quantity (and remove if quantity becomes 0)
      decreaseQuantity: (itemId) => {
        const currentItem = get().items.find((item) => item.id === itemId);
        if (currentItem && currentItem.quantity > 1) {
          // Decrease quantity if it's more than 1
          set((state) => ({
            items: state.items.map((item) =>
              item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
            ),
          }));
        } else {
          // Remove item if quantity is 1 or less
          get().removeItem(itemId);
        }
      },

      // Action to clear the cart
      clearCart: () => {
        set({ items: [] });
      },
    }),
    {
      name: 'snacky-cart-storage', // Name of the item in storage (must be unique)
      storage: createJSONStorage(() => localStorage), // Use localStorage
      // You can choose sessionStorage instead if you prefer
    }
  )
);

// Optional: Selector to get total number of items (more performant than calculating in every component)
export const useCartTotalItems = () => useCartStore((state) =>
  state.items.reduce((total, item) => total + item.quantity, 0)
);

// Optional: Selector to get total price (handle string parsing carefully)
export const useCartTotalPrice = () => useCartStore((state) => {
    return state.items.reduce((total, item) => {
        // Convert price string (e.g., "9.99₾") to number
        const priceNumber = parseFloat(item.price.replace('₾', '')) || 0;
        return total + (priceNumber * item.quantity);
    }, 0);
});