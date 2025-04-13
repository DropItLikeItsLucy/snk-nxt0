// app/cart/page.tsx
'use client'; // This page needs client-side interaction

import { useCartStore, useCartTotalPrice } from '@/store/cartStore'; // Import store & total price selector
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'; // Icons
import { formatCurrency } from '@/lib/utils'; // We'll create this helper

export default function CartPage() {
  // Get state and actions from the Zustand store
  const items = useCartStore((state) => state.items);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const totalPrice = useCartTotalPrice(); // Use the selector for total price

  // Helper function to calculate item total (assuming price is like "9.99₾")
  const calculateItemTotal = (priceStr: string, quantity: number): number => {
    const priceNumber = parseFloat(priceStr.replace('₾', '')) || 0;
    return priceNumber * quantity;
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">თქვენი კალათა</h1> {/* Your Cart */}

      {items.length === 0 ? (
        // --- Empty Cart View ---
        <div className="text-center py-16 border border-dashed rounded-lg">
          <ShoppingBag className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <p className="text-gray-600 mb-6">თქვენი კალათა ცარიელია.</p> {/* Your cart is empty. */}
          <Button asChild>
            <Link href="/product">პროდუქტების ნახვა</Link> {/* Browse Products */}
          </Button>
        </div>
      ) : (
        // --- Cart with Items View ---
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">

          {/* Cart Items List (Takes 2 columns on large screens) */}
          <div className="lg:col-span-2">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px] hidden md:table-cell">სურათი</TableHead> {/* Image */}
                  <TableHead>პროდუქტი</TableHead> {/* Product */}
                  <TableHead className="text-center">რაოდენობა</TableHead> {/* Quantity */}
                  <TableHead className="text-right">ჯამი</TableHead> {/* Total */}
                  <TableHead className="text-right">წაშლა</TableHead> {/* Remove */}
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.id}>
                    {/* Image Cell (Hidden on small screens) */}
                    <TableCell className="hidden md:table-cell">
                      <div className="relative h-16 w-16 rounded overflow-hidden">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        ) : (
                          <div className="bg-gray-200 h-full w-full"></div>
                        )}
                      </div>
                    </TableCell>
                    {/* Product Name & Price Cell */}
                    <TableCell className="font-medium">
                      <Link href={`/product/${item.id}`} className="hover:underline">
                         {item.name}
                      </Link>
                      <div className="text-sm text-gray-500 mt-1">{item.price}</div>
                    </TableCell>
                    {/* Quantity Cell */}
                    <TableCell className="text-center">
                       <div className="flex items-center justify-center gap-2">
                           <Button
                             variant="outline"
                             size="icon"
                             className="h-7 w-7"
                             onClick={() => decreaseQuantity(item.id)}
                             aria-label="Decrease quantity"
                           >
                              <Minus size={14} />
                           </Button>
                           <span className="min-w-[20px] text-center font-medium">{item.quantity}</span>
                           <Button
                              variant="outline"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => increaseQuantity(item.id)}
                              aria-label="Increase quantity"
                           >
                               <Plus size={14} />
                           </Button>
                       </div>
                    </TableCell>
                    {/* Item Total Cell */}
                    <TableCell className="text-right font-medium">
                       {formatCurrency(calculateItemTotal(item.price, item.quantity))}
                    </TableCell>
                    {/* Remove Cell */}
                    <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-gray-500 hover:text-red-600"
                          onClick={() => removeItem(item.id)}
                          aria-label="Remove item"
                        >
                            <Trash2 size={18} />
                        </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Cart Summary (Takes 1 column on large screens) */}
          <div className="lg:col-span-1">
             <Card>
                <CardHeader>
                    <CardTitle>შეკვეთის ჯამი</CardTitle> {/* Order Summary */}
                </CardHeader>
                <CardContent className="space-y-4">
                   <div className="flex justify-between">
                       <span>შუალედური ჯამი</span> {/* Subtotal */}
                       <span>{formatCurrency(totalPrice)}</span>
                   </div>
                   {/* Add Shipping Cost simulation if needed */}
                   <div className="flex justify-between text-gray-500">
                       <span>მიწოდება</span> {/* Shipping */}
                       <span>უფასო</span> {/* Free (or calculate) */}
                   </div>
                   <Separator />
                    <div className="flex justify-between font-semibold text-lg">
                       <span>სრული ჯამი</span> {/* Total */}
                       <span>{formatCurrency(totalPrice)}</span>
                    </div>
                </CardContent>
                <CardFooter>
                     <Button asChild size="lg" className="w-full bg-orange-500 hover:bg-orange-600">
                         <Link href="/checkout"> {/* Link to a future checkout page */}
                            გაგრძელება {/* Proceed to Checkout */}
                         </Link>
                     </Button>
                </CardFooter>
             </Card>
          </div>

        </div>
      )}
    </div>
  );
}