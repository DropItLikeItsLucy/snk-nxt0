// app/blog/[slug]/page.tsx
import { getAllPostSlugs, getPostData } from '@/lib/posts';
import { format } from 'date-fns';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image'; // Import Image
// Import your MDX rendering component

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug;
  try {
    const post = await getPostData(slug);
    return {
      title: `${post.title} - Snacky Blog`,
      description: post.excerpt || 'Read this article from Snacky.',
       // Add Open Graph image if post.image exists
       openGraph: post.image ? {
           images: [
               {
                   url: post.image, // Use absolute URL in production if needed
                   // width: 1200, // Optional: Specify dimensions
                   // height: 630,
                   alt: post.title,
               }
           ]
       } : undefined,
    };
  } catch (error) {
    return { title: 'Post Not Found' }
  }
}

export async function generateStaticParams() {
  const paths = getAllPostSlugs();
  return paths;
}

export default async function BlogPost({ params }: Props) {
  const slug = params.slug;
  try {
    const post = await getPostData(slug);

    return (
      <article className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-4xl font-bold mb-3">{post.title}</h1>
        <p className="text-gray-500 mb-6">
          {format(new Date(post.date), 'MMMM d, yyyy')}
        </p>

        {/* Featured Image */}
        {post.image && (
          <div className="relative w-full aspect-[16/9] mb-8 rounded-lg overflow-hidden shadow-lg"> {/* Wider aspect ratio for featured image */}
             <Image
                src={post.image}
                alt={`Featured image for ${post.title}`}
                fill
                className="object-cover"
                priority // Prioritize loading the main post image
             />
          </div>
        )}

        {/* Render MDX Content Here */}
        <div className="prose lg:prose-xl max-w-none">
          {/* Your MDX rendering solution here */}
           {/* Example placeholder: */}
           <p>(MDX Content for {post.title} goes here...)</p>
           <p>{post.content.substring(0, 200)}...</p>
        </div>
      </article>
    );
  } catch (error) {
    console.error("Error fetching post:", error);
    notFound();
  }
}