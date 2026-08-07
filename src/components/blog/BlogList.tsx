'use client';

import { BlogPostPreview } from '@/types/blog';
import React, { useState } from 'react';

import { BlogCard } from './BlogCard';

interface BlogListProps {
  posts: BlogPostPreview[];
  className?: string;
  disableBlur?: boolean;
  showTags?: boolean;
  showDescription?: boolean;
}

export function BlogList({
  posts,
  className = '',
  disableBlur = false,
  showTags = true,
  showDescription = false,
}: BlogListProps) {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

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
    <div
      className={`flex flex-col ${className}`}
      onMouseLeave={() => !disableBlur && setHoveredSlug(null)}
    >
      {posts.map((post) => (
        <BlogCard
          key={post.slug}
          post={post}
          isDimmed={!disableBlur && hoveredSlug !== null && hoveredSlug !== post.slug}
          onHover={() => !disableBlur && setHoveredSlug(post.slug)}
          onLeave={() => !disableBlur && setHoveredSlug(null)}
          showTags={showTags}
          showDescription={showDescription}
        />
      ))}
    </div>
  );
}