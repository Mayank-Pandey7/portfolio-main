'use client';

import { BlogPostPreview } from '@/types/blog';
import { ArrowRight, Calendar } from 'lucide-react';
import React from 'react';

import { TrackedLink } from '../common/TrackedLink';

interface BlogCardProps {
  post: BlogPostPreview;
  isDimmed?: boolean;
  onHover?: () => void;
  onLeave?: () => void;
  showTags?: boolean;
  showDescription?: boolean;
}

export function BlogCard({
  post,
  isDimmed = false,
  onHover,
  onLeave,
  showTags = true,
  showDescription = false,
}: BlogCardProps) {
  const { slug, frontmatter } = post;
  const { title, description, tags, date } = frontmatter;

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
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
      className={`group block py-2.5 last:border-0 transition-all duration-300 ease-in-out ${
        isDimmed
          ? 'opacity-100 blur-none scale-100 sm:opacity-35 sm:blur-[4px] sm:scale-[0.99]'
          : 'opacity-100 blur-0 scale-100'
      }`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className="flex items-start justify-between gap-6">
        <div className="min-w-0 flex-1 space-y-2">
          {/* Title */}
          <h3 className="text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
            {title}
          </h3>

          {/* Subtitle / Excerpt */}
          {showDescription && description && (
            <p className="line-clamp-1 text-sm leading-relaxed text-neutral-400">
              {description}
            </p>
          )}

          {/* Tags Badges */}
          {showTags && tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-neutral-800/80 px-2.5 py-0.5 text-xs font-medium capitalize text-neutral-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Date with Calendar Icon */}
          <div className="flex items-center gap-1.5 pt-0.5 text-xs text-neutral-400">
            <Calendar className="size-3.5 text-neutral-500" />
            <time dateTime={date}>{formattedDate}</time>
          </div>
        </div>

        {/* Read More Link on Right (Hidden on mobile, visible on desktop) */}
        <span className="hidden sm:inline-flex shrink-0 items-center gap-1.5 pt-1 text-sm font-medium text-neutral-400 transition-colors group-hover:text-foreground">
          Read more{' '}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </TrackedLink>
  );
}