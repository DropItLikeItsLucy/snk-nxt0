// app/blog/[slug]/page.tsx
import { getAllPostSlugs, getPostData } from '@/lib/posts';
import { format } from 'date-fns';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
// ↓↓↓ Make sure you import your MDX rendering component here ↓↓↓
// Example: import { MDXRemote } from 'next-mdx-remote/rsc';
// Example: import YourCustomMDXComponent from '@/components/custom/YourCustomMDXComponent';
import { MDXRemote } from 'next-mdx-remote/rsc';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug;
  try {
    // Ensure getPostData fetches 'title', 'excerpt', 'image'
    const post = await getPostData(slug);
    return {
      title: `${post.title} - Snacky Blog`,
      description: post.excerpt || `Read the Snacky blog post: ${post.title}`,
       openGraph: post.image ? {
           images: [ { url: post.image, alt: post.title } ]
       } : undefined,
    };
  } catch (error) {
    console.error("Metadata generation error:", error);
    return { title: 'Post Not Found' }
  }
}

export async function generateStaticParams() {
  // Ensure getAllPostSlugs works correctly
  try {
      const paths = getAllPostSlugs();
      return paths;
  } catch(error) {
      console.error("Error getting slugs for static params:", error);
      return []; // Return empty array on error
  }
}

export default async function BlogPost({ params }: Props) {
  const slug = params.slug;
  try {
    // Ensure getPostData fetches 'title', 'date', 'image', 'content'
    const post = await getPostData(slug);

    // --- Main Component Return ---
    return (
      // Container for the whole page content for this route
      <div className="container mx-auto px-4 py-12 max-w-3xl">

        {/* Post Header */}
        <h1 className="text-3xl md:text-4xl font-bold mb-3">{post.title}</h1>
        <p className="text-gray-500 mb-6 text-sm">
          {format(new Date(post.date), 'MMMM d, yyyy')}
        </p>

        {/* Featured Image */}
        {post.image && (
          <div className="relative w-full aspect-[16/9] mb-8 rounded-lg overflow-hidden shadow-lg">
             <Image
                src={post.image}
                alt={`Featured image for ${post.title}`}
                fill
                className="object-cover"
                priority
             />
          </div>
        )}

        {/* --- RENDER BLOG POST CONTENT HERE --- */}
        {/* Use <article> for semantic correctness */}
        {/* Apply 'prose' classes for Tailwind Typography styling */}
        <article className="prose prose-lg lg:prose-xl max-w-none prose-headings:font-semibold prose-headings:mb-4 prose-p:leading-relaxed prose-p:mb-4 prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-4 prose-ol:list-decimal prose-ol:pl-6 prose-ol:mb-4 prose-a:text-orange-600 hover:prose-a:text-orange-700 prose-img:rounded-md prose-img:shadow-sm prose-blockquote:border-l-orange-400 prose-blockquote:pl-4 prose-blockquote:italic">

          {/*
             *******************************************************************
             *** CRITICAL: INSERT YOUR MDX RENDERING COMPONENT HERE! ***
             *******************************************************************

             Replace this entire comment block with the component that renders
             the `post.content` variable into HTML.

             Examples:

             1. If using `next-mdx-remote`:
                <MDXRemote source={post.content} components={/* Optional: Custom components * /} />

             2. If using Next.js built-in MDX with a custom component wrapper:
                <YourCustomMDXComponent content={post.content} />

             ---> Without this step, your blog post text will not appear! <---
          */}
<MDXRemote source={post.content} />
        </article>
        {/* --- END OF BLOG POST CONTENT --- */}

      </div> // End of page container
    );
  } catch (error) {
    // Log the specific error for better debugging
    console.error(`Error fetching or rendering post "${slug}":`, error);
    notFound(); // Trigger the 404 page
  }
}