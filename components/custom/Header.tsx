// components/custom/Header.tsx
import Link from 'next/link';
import Image from 'next/image';
// Import necessary Shadcn components like Button, NavigationMenu, Sheet (for mobile)
import { Button } from '@/components/ui/button';
import { ShoppingCart, Menu } from 'lucide-react'; // Example icons

const Header = () => {
  // Add state for mobile menu if needed using useState

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md py-2 px-4 md:px-8">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <Image src="/images/snacky-logo.png" alt="Snacky Logo" width={100} height={40} />
          {/* Adjust width/height */}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 items-center">
          {/* <Link href="/" className="hover:text-orange-500">მთავარი</Link> Home */}
          <Link href="/product" className="hover:text-orange-500">პროდუქტი</Link> {/* Product */}
          <Link href="/partners" className="hover:text-orange-500">პარტნიორები</Link> {/* Partners */}
          <Link href="/blog" className="hover:text-orange-500">ბლოგი</Link> {/* Blog */}
          <Link href="/about" className="hover:text-orange-500">ჩვენ შესახებ</Link> {/* About */}
          <Link href="/contact" className="hover:text-orange-500">კონტაქტი</Link> {/* Contact */}
        </nav>

        {/* Actions / Cart */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Replace with your actual cart logic/link if selling directly */}
          <Button variant="outline" size="sm">
             კალათა / 0.00₾ <ShoppingCart className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="warning" size="sm">შესვლა / რეგისტრაცია</Button> {/* Example: Needs Shadcn variant */}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon"> {/* Use Sheet from Shadcn for drawer */}
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>
      {/* Add Mobile Menu Drawer component here (e.g., using Shadcn's Sheet) */}
    </header>
  );
};

export default Header;