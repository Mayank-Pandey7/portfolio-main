'use client';

import { BlogPostPreview } from '@/types/blog';
import { cn } from '@/lib/utils';
import { useState } from 'react';

import { TrackedLink } from '../common/TrackedLink';

interface BlogCardProps {
  post: BlogPostPreview;
}

export function BlogCard({ post }: BlogCardProps) {
  const { slug, frontmatter } = post;
  const { title, tags, date } = frontmatter;

  const [isHovered, setIsHovered] = useState(false);

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <TrackedLink
      href={`/blog/${slug}`}
      track={{
        name: 'button_click',
        data: {
          buttonId: 'blog_card',
          section: 'blog',
          action: slug,
        },
      }}
      className="group block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col gap-1 border-b border-neutral-200/50 py-4 dark:border-neutral-800/60 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex min-w-0 items-center gap-2">
            <h3 className="truncate text-base font-semibold transition-colors group-hover:text-primary sm:text-lg">
              {title}
            </h3>

            <span
              className={cn(
                'shrink-0 text-sm text-neutral-400 transition-opacity duration-200',
                isHovered ? 'opacity-100' : 'opacity-0',
              )}
            >
              &gt;
            </span>
          </div>

          {tags.length > 0 && (
            <div className="mt-1 flex flex-wrap gap-x-2 text-xs text-muted-foreground">
              {tags.slice(0, 3).map((tag, index) => (
                <span key={tag}>
                  {tag}
                  {index < Math.min(tags.length, 3) - 1 && (
                    <span className="ml-2 text-neutral-300 dark:text-neutral-700">
                      •
                    </span>
                  )}
                </span>
              ))}
            </div>
          )}
        </div>

        <time
          dateTime={date}
          className="shrink-0 text-xs text-muted-foreground sm:ml-6 sm:text-sm"
        >
          {formattedDate}
        </time>
      </div>
    </TrackedLink>
  );
}