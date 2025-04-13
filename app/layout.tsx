// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/custom/Header'; // Assuming you create this
// import Footer from '@/components/custom/Footer'; // Assuming you create this
import { cn } from '@/lib/utils'; // For combining class names

const inter = Inter({ subsets: ['latin'] });

// Define default metadata for SEO
export const metadata: Metadata = {
  title: 'Snacky - Delicious Peanut Butter',
  description: 'Discover Snacky peanut butter, available online and in stores near you.',
  // Add more metadata: openGraph, icons, etc.
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, 'bg-cream-100 text-gray-800')}> {/* Example bg color */}
        <Header /> {/* Your site header component */}
        <main className="min-h-screen pt-16"> {/* Add padding-top if header is fixed */}
          {children}
        </main>
        {/* <Footer /> Your site footer component */}
      </body>
    </html>
  );
}