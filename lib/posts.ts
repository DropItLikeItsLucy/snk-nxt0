// lib/posts.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
// date-fns import likely not needed directly here anymore, but keep if used elsewhere

const postsDirectory = path.join(process.cwd(), 'content/blog');

// Define a type for better type safety
type PostData = {
  slug: string;
  title: string;
  date: string;
  excerpt?: string; // Excerpt is optional
  image?: string;   // Image is optional
};

type FullPostData = PostData & {
    content: string;
}

export function getSortedPostsData(): PostData[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName): PostData => { // Specify return type PostData
    const slug = fileName.replace(/\.(md|mdx)$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    // Basic validation
    if (!matterResult.data.title || !matterResult.data.date) {
        console.warn(`Post "${slug}" is missing title or date in frontmatter.`);
        // Handle appropriately, maybe filter it out or provide defaults
    }

    return {
      slug,
      // Use type assertion for the frontmatter data, including the new 'image' field
      ...(matterResult.data as { title: string; date: string; excerpt?: string; image?: string }),
    };
  });

  // Sort posts by date
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostData(slug: string): Promise<FullPostData> { // Specify return type
    const fullPath = path.join(postsDirectory, `${slug}.mdx`); // Or handle .md
    if (!fs.existsSync(fullPath)) {
        // Check if the .md version exists as a fallback or throw specific error
        // const mdPath = path.join(postsDirectory, `${slug}.md`);
        // if (!fs.existsSync(mdPath)) {
        //     throw new Error(`Post not found for slug: ${slug}`);
        // }
        // fullPath = mdPath; // Use the md path if found
         throw new Error(`Post file not found at ${fullPath}`); // Or use notFound() logic earlier
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

     // Basic validation
    if (!matterResult.data.title || !matterResult.data.date) {
        console.warn(`Post "${slug}" is missing title or date in frontmatter.`);
    }

    return {
      slug,
      content: matterResult.content,
      // Use type assertion for the frontmatter data, including 'image'
      ...(matterResult.data as { title: string; date: string; excerpt?: string; image?: string }),
    };
}


// getAllPostSlugs remains the same
export function getAllPostSlugs() {
    const fileNames = fs.readdirSync(postsDirectory);
    // Filter out any non-markdown files if necessary
    const mdFiles = fileNames.filter(name => name.endsWith('.md') || name.endsWith('.mdx'));
    return mdFiles.map((fileName) => ({
      slug: fileName.replace(/\.(md|mdx)$/, ''),
    }));
  }