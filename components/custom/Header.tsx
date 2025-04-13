// components/custom/Header.tsx
'use client'; // <-- Mark Header (or relevant part) as a Client Component

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Menu } from 'lucide-react';
import { useCartStore } from '@/store/cartStore'; // Import the store hook
// Import Sheet components if using Shadcn for mobile menu
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const Header = () => {
  // Get items directly OR use the optimized selector
  // const items = useCartStore((state) => state.items);
  // const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  // Or use the selector we created (better)
  const totalItems = useCartStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0)
  );


  // Add state for mobile menu if needed
  // const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-white shadow-md py-2 px-4 md:px-8">
        {/* Use sticky instead of fixed if you want it to scroll with content until it hits the top */}
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <Image src="/images/snacky-logo.png" alt="Snacky Logo" width={100} height={40} priority />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 items-center text-sm font-medium">
          {/* Links... */}
          {/* <Link href="/" className="hover:text-orange-500">მთავარი</Link> */}
          <Link href="/product" className="hover:text-orange-500">პროდუქტი</Link>
          <Link href="/partners" className="hover:text-orange-500">პარტნიორები</Link>
          <Link href="/blog" className="hover:text-orange-500">ბლოგი</Link>
          <Link href="/about" className="hover:text-orange-500">ჩვენ შესახებ</Link>
          <Link href="/contact" className="hover:text-orange-500">კონტაქტი</Link>
        </nav>

        {/* Actions / Cart */}
        <div className="flex items-center space-x-4">
          {/* Cart Button/Link */}
          <Button asChild variant="outline" size="sm" className="relative">
             {/* Link to a future Cart page */}
            <Link href="/cart">
              <ShoppingCart className="h-4 w-4 mr-1" />
              {/* Display total item count */}
              <span>{totalItems}</span>
              {/* Optional: Add badge for count if > 0 */}
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
          </Button>

           {/* Login/Register Button (Desktop) */}
          <div className='hidden md:block'>
              <Button variant="warning" size="sm">შესვლა / რეგისტრაცია</Button> {/* Example */}
          </div>

        </div>

        {/* Mobile Menu Button & Drawer */}
        <div className="md:hidden">
          {/* Example using Shadcn Sheet */}
          {/* <Sheet>
             <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                </Button>
             </SheetTrigger>
             <SheetContent> */}
                 {/* Mobile Menu Content Here - Links, Cart button, Login button */}
             {/* </SheetContent>
           </Sheet> */}
             {/* Placeholder if not using Sheet */}
             <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
            </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;