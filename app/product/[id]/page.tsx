// app/product/[id]/page.tsx
import { getProductById, getAllProductIds } from '@/lib/data'; // Import data functions
import { notFound } from 'next/navigation'; // Import notFound
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import type { Metadata, ResolvingMetadata } from 'next';
import { AddToCartButton } from '@/components/custom/AddToCartButton';
type Props = {
  params: { id: string }; // Params passed from the dynamic route
};

// --- Generate Metadata for each product page ---
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata // Optional: access parent metadata
): Promise<Metadata> {
  const id = params.id;
  const product = getProductById(id);

  if (!product) {
    // Optionally return default metadata or handle differently
    return {
        title: "Product Not Found",
        description: "The requested product could not be found."
    }
  }

  const siteBaseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const imageUrl = product.image ? `${siteBaseUrl}${product.image}` : undefined;
  // Optionally merge with parent metadata
  // const previousImages = (await parent).openGraph?.images || []

  return {
    title: `${product.name} - Snacky`,
    description: product.description.substring(0, 160), // Limit description length
    openGraph: {
      title: `${product.name} - Snacky`,
      description: product.description.substring(0, 160),
      images: imageUrl ? [ { url: imageUrl, alt: product.name } ] : [],
    },
  };
}

// --- Generate Static Paths at build time ---
export async function generateStaticParams() {
  const productIds = getAllProductIds(); // [{ id: 'classic' }, { id: 'crunchy' }, ...]

  // The function expects an array of objects matching the params shape
  return productIds;
}

// --- The Page Component ---
export default function ProductDetailPage({ params }: Props) {
  const id = params.id;
  const product = getProductById(id);

  // --- Handle Product Not Found ---
  if (!product) {
    notFound(); // This will render the nearest not-found.tsx file or a default Next.js 404 page
  }
  const productForCart = {
    id: product.id,
    name: product.name,
    price: product.price, // Pass the price string
    image: product.image
};
  return (
    <div className="container mx-auto px-4 py-12">
       {/* Back Button */}
       <div className="mb-6">
          <Button asChild variant="outline" size="sm">
              <Link href="/product" className="inline-flex items-center gap-2">
                 <ArrowLeft size={16} />
                 ყველა პროდუქტი {/* All Products */}
              </Link>
          </Button>
       </div>

      {/* Product Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">

        {/* Product Image */}
        <div className="relative aspect-square w-full rounded-lg overflow-hidden shadow-md">
           {/* Ensure product.image exists and is a valid path */}
           {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority // Load this image first on the page
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 23vw" // Adjust sizes based on layout
              />
           ) : (
              <div className="bg-gray-200 h-full w-full flex items-center justify-center text-gray-500">No Image</div> // Placeholder
           )}
        </div>

        {/* Product Details */}
        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold">{product.name}</h1>

          {/* Price */}
          <div className="flex items-baseline gap-x-3">
            <span className={`text-2xl font-semibold ${product.oldPrice ? 'text-red-600' : 'text-gray-900'}`}>
              {product.price}
            </span>
            {product.oldPrice && (
              <span className="text-base text-gray-500 line-through">
                {product.oldPrice}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-700 leading-relaxed">{product.description}</p>
          <p className="text-gray-700 leading-relaxed">{product.details}</p>

          {/* Optional: Ingredients / Nutritional Info */}
          {/* {product.ingredients && (
              <div className="pt-4 border-t mt-4">
                  <h3 className="font-semibold mb-2">Ingredients:</h3>
                  <p className="text-sm text-gray-600">{product.ingredients.join(', ')}</p>
              </div>
          )}
          {product.nutritionalInfo && (
               <div className="pt-4 border-t mt-4">
                  <h3 className="font-semibold mb-2">Nutritional Info:</h3>
                  <p className="text-sm text-gray-600 whitespace-pre-line">{product.nutritionalInfo}</p>
               </div>
          )} */}

          {/* Add to Cart Button (or other CTA) */}
          <div className="pt-4">
            <AddToCartButton product={productForCart} />
             {/* <Button size="lg" className="w-full md:w-auto bg-orange-500 hover:bg-orange-600">
                კალათაში დამატება 
             </Button> */}
             {/* Note: Add to Cart requires state management (Context, Zustand, Redux) or Server Actions */}
          </div>

        </div>
      </div>
    </div>
  );
}