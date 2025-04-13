// components/custom/AddToCartButton.tsx
'use client'; // <-- Mark this as a Client Component

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useCartStore, type CartItem } from '@/store/cartStore'; // Import the store and type
import { ShoppingCart, Check } from 'lucide-react'; // Import icons

// Define props including the necessary product details
interface AddToCartButtonProps {
  product: Omit<CartItem, 'quantity'>; // Pass id, name, price, image
}

export const AddToCartButton = ({ product }: AddToCartButtonProps) => {
  const addItem = useCartStore((state) => state.addItem); // Get the action from the store
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addItem(product); // Call the action with product data
    setAdded(true);
    // Reset the 'Added' state after a short delay
    setTimeout(() => {
      setAdded(false);
    }, 1500); // Show feedback for 1.5 seconds
  };

  return (
    <Button
      size="lg"
      className={`w-full md:w-auto transition-all duration-300 ${
        added ? 'bg-green-600 hover:bg-green-700' : 'bg-orange-500 hover:bg-orange-600'
      }`}
      onClick={handleAddToCart}
      disabled={added} // Disable button briefly after adding
    >
      {added ? (
        <>
          დამატებულია <Check size={20} className="ml-2" /> {/* Added */}
        </>
      ) : (
        <>
          კალათაში დამატება <ShoppingCart size={20} className="ml-2" /> {/* Add to Cart */}
        </>
      )}
    </Button>
  );
};