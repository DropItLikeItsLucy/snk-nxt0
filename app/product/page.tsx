// app/product/page.tsx
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Products - Snacky',
  description: 'Explore the range of Snacky peanut butter options.',
};

// Example product data - move to /lib/data.ts or CMS
const products = [
  { id: 'classic', name: 'Classic Creamy', description: 'Our original smooth classic.', image: '/images/product/1.jpg', price: '9.99₾' },
  { id: 'crunchy', name: 'Super Crunchy', description: 'Packed with peanut chunks.', image: '/images/product/2+1.jpg', price: '9.99₾' },
  { id: 'choco', name: 'Chocolate Swirl', description: 'Creamy peanut butter with chocolate.', image: '/images/product/4+2.jpg', price: '10.99₾' },
  { id: 'protein', name: 'Protein Plus', description: 'Extra protein for your active lifestyle.', image: '/images/product/400.jpg', price: '11.99₾' },
];

export default function ProductPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">ჩვენი პროდუქტები</h1> {/* Our Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="flex flex-col">
            <CardHeader>
              <div className="aspect-square relative w-full mb-4"> {/* Ensure square aspect ratio for image */}
                <Image
                   src={product.image}
                   alt={product.name}
                   fill // Use fill to cover the container
                   className="object-cover rounded-t-lg" // Cover ensures no distortion
                />
              </div>
              <CardTitle>{product.name}</CardTitle>
              <CardDescription>{product.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-end">
              <div className="mt-auto"> {/* Pushes content below to the bottom */}
                 <p className="text-lg font-semibold mb-3">{product.price}</p>
                 {/* Add Button (link to detail page or add to cart) */}
                 <Button className="w-full">
                   {/* Optional: Link to a detail page: /product/{product.id} */}
                    დეტალურად {/* View Details */}
                 </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}