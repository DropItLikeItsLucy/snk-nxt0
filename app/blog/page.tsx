// app/blog/page.tsx
import Link from 'next/link';
import Image from 'next/image'; // Import next/image
import { getSortedPostsData } from '@/lib/posts';
import { format } from 'date-fns';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Snacky Blog',
  description: 'News, recipes, and articles from Snacky.',
};

export default function BlogIndex() {
  const allPosts = getSortedPostsData();

  return (
    <div className="container mx-auto px-4 py-12">
      {/* <h1 className="text-3xl font-bold text-center mb-8">ჩვენი ბლოგი</h1> Our Blog */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> {/* Using a grid layout */}
        {allPosts.map(({ slug, date, title, excerpt, image }) => ( // Destructure image
          <article key={slug} className="flex flex-col bg-white rounded-lg shadow hover:shadow-md transition-shadow overflow-hidden">
            {/* Conditionally render image */}
            {image && (
              <Link href={`/blog/${slug}`} className="block">
                <div className="relative w-full aspect-video"> {/* Aspect ratio container */}
                  <Image
                    src={image}
                    alt={`Featured image for ${title}`}
                    fill // Use fill with a sized container
                    className="object-cover" // Cover ensures image fills container without distortion
                  />
                </div>
              </Link>
            )}
            <div className="p-6 flex flex-col flex-grow"> {/* Content padding and flex grow */}
              <h2 className="text-xl font-semibold mb-2">
                <Link href={`/blog/${slug}`} className="hover:text-orange-600">
                  {title}
                </Link>
              </h2>
              <p className="text-sm text-gray-500 mb-3">
                {format(new Date(date), 'MMMM d, yyyy')}
              </p>
              {excerpt && ( // Only show excerpt if it exists
                <p className="text-gray-700 mb-4 text-sm flex-grow">{excerpt}</p>
              )}
              <div className="mt-auto"> {/* Push link to bottom */}
                 <Link href={`/blog/${slug}`} className="text-orange-500 hover:underline font-medium text-sm">
                   წაიკითხე სრულად {'->'} {/* Read More */}
                 </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}