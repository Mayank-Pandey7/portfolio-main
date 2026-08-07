import { BlogPostPreview } from '@/types/blog';

import { BlogCard } from './BlogCard';

interface BlogListProps {
  posts: BlogPostPreview[];
  className?: string;
}

export function BlogList({ posts, className = '' }: BlogListProps) {
  if (posts.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-muted-foreground">No blog posts found</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Check back later for new content!
        </p>
      </div>
    );
  }

  return (
    <div className={`flex flex-col ${className}`}>
      {posts.map((post) => (
        <BlogCard key={post.slug} post={post} />
      ))}
    </div>
  );
}