// app/product/page.tsx
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Metadata } from 'next';
import { products, type Product } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Our Products - Snacky',
  description: 'Explore the range of Snacky peanut butter options.',
};

// (Your updated products array or import statement here)
// const products = [ ... see above ... ];
// Define the type if you added it
type Product = { /* ... see above ... */ };

export default function ProductPage() {
  // Cast your data to the type if needed, e.g., if imported
  const productData: Product[] = products;

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">ჩვენი პროდუქტები</h1> {/* Our Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {productData.map((product) => ( // Use productData which has the type
          <Card key={product.id} className="flex flex-col">
            <CardHeader>
              <div className="aspect-square relative w-full mb-4">
                <Image
                   src={product.image}
                   alt={product.name}
                   fill
                   className="object-cover rounded-t-lg"
                   sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 23vw" // Example sizes prop for optimization
                />
              </div>
              <CardTitle>{product.name}</CardTitle>
              <CardDescription>{product.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-end">
              <div className="mt-auto">

                {/* --- PRICE DISPLAY LOGIC --- */}
                <div className="flex items-baseline gap-x-2 mb-3"> {/* Container for prices */}
                  {/* Current Price */}
                  <span className={`text-lg font-semibold ${product.oldPrice ? 'text-red-600' : 'text-gray-800'}`}>
                    {product.price}
                  </span>

                  {/* Old Price (Conditional) */}
                  {product.oldPrice && ( // Only show if oldPrice exists
                    <span className="text-sm text-gray-500 line-through"> {/* Style for old price */}
                      {product.oldPrice}
                    </span>
                  )}
                </div>
                {/* --- END OF PRICE DISPLAY LOGIC --- */}

                {/* Add Button */}
                <Button asChild className="w-full">
                  {/* Optional: Link to a detail page: /product/{product.id} */}
                   <Link href={`/product/${product.id}`}> {/* Example linking */}
                      დეტალურად {/* View Details */}
                   </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}