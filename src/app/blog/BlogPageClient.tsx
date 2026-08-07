'use client';

import { BlogList } from '@/components/blog/BlogList';
import Container from '@/components/common/Container';
import { BlogPostPreview } from '@/types/blog';
import React, { useState } from 'react';

interface BlogPageClientProps {
  initialPosts: BlogPostPreview[];
  initialTags: string[];
}

export function BlogPageClient({
  initialPosts,
  initialTags,
}: BlogPageClientProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Calculate post count for each tag
  const tagCounts = initialTags.map((tag) => ({
    name: tag,
    count: initialPosts.filter((post) =>
      post.frontmatter.tags.some(
        (t) => t.toLowerCase() === tag.toLowerCase(),
      ),
    ).length,
  }));

  const filteredPosts = selectedTag
    ? initialPosts.filter((post) =>
        post.frontmatter.tags.some(
          (t) => t.toLowerCase() === selectedTag.toLowerCase(),
        ),
      )
    : initialPosts;

  return (
    <Container className="mx-auto max-w-3xl py-10 space-y-8">
      {/* Title & Tagline */}
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
          Blog
        </h1>
        <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
          Thoughts, tutorials, and insights on engineering and programming.
        </p>
      </div>

      {/* Category Pills Bar (Horizontal Single Line Scroll) */}
      <div className="flex items-center gap-2 overflow-x-auto py-1 flex-nowrap [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {/* All Pill */}
        <button
          onClick={() => setSelectedTag(null)}
          className={`flex shrink-0 whitespace-nowrap items-center gap-2 rounded-full px-3.5 py-1 text-sm font-medium transition-colors cursor-pointer ${
            selectedTag === null
              ? 'bg-neutral-200 text-black font-semibold'
              : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-foreground'
          }`}
        >
          <span>All</span>
          <span
            className={`text-xs px-2 py-0.5 rounded-full ${
              selectedTag === null
                ? 'bg-black/15 text-black font-bold'
                : 'bg-neutral-800 text-neutral-400'
            }`}
          >
            {initialPosts.length}
          </span>
        </button>

        {/* Individual Tag Pills */}
        {tagCounts.map(({ name, count }) => {
          const isActive = selectedTag?.toLowerCase() === name.toLowerCase();
          return (
            <button
              key={name}
              onClick={() => setSelectedTag(isActive ? null : name)}
              className={`flex shrink-0 whitespace-nowrap items-center gap-2 rounded-full px-3.5 py-1 text-sm font-medium transition-colors cursor-pointer capitalize ${
                isActive
                  ? 'bg-neutral-200 text-black font-semibold'
                  : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-foreground'
              }`}
            >
              <span>{name}</span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  isActive
                    ? 'bg-black/15 text-black font-bold'
                    : 'bg-neutral-800 text-neutral-400'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Blog List */}
      <BlogList posts={filteredPosts} />
    </Container>
  );
}
