// app/layout.tsx
import type { Metadata } from 'next';
import { Inter, Noto_Sans_Georgian } from 'next/font/google';
import './globals.css';
import Header from '@/components/custom/Header'; // Assuming you create this
import Footer from '@/components/custom/Footer'; // Assuming you create this
import { cn } from '@/lib/utils'; // For combining class names

const inter = Inter({ subsets: ['latin'] });

const notosomeGeorgian = Noto_Sans_Georgian({
  subsets: ['georgian', 'latin'],
  weight: ['400', '500', '600', '700'], // Adjust weights as needed
  display: 'swap',
  variable: '--font-noto-georgian',
});

// Define default metadata for SEO
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
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
      <body className={cn(notosomeGeorgian.className, 'bg-cream-100 text-gray-800')}> {/* Example bg color */}
        <Header /> {/* Your site header component */}
        <main className="min-h-screen pt-0"> {/* Add padding-top if header is fixed */}
          {children}
        </main>
        <Footer /> {/* Your site footer component */}
      </body>
    </html>
  );
}