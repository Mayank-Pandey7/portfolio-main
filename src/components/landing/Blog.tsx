import { getPublishedBlogPosts } from '@/lib/blog';
import { Link } from 'next-view-transitions';
import React from 'react';

import { BlogList } from '../blog/BlogList';
import Container from '../common/Container';
import SectionHeading from '../common/SectionHeading';
import { Button } from '../ui/button';

export default function Blog() {
  const posts = getPublishedBlogPosts();

  return (
    <Container className="mt-20">
      <SectionHeading subHeading="Featured" heading="Blogs" />

      <BlogList
        posts={posts.slice(0, 3)}
        className="mt-6"
        disableBlur={true}
        showTags={false}
      />

      <div className="mt-8 flex justify-center">
        <Button
          variant="outline"
          track={{
            name: 'button_click',
            data: { buttonId: 'show_all_blogs', section: 'blog' },
          }}
        >
          <Link href="/blog">Show all blogs</Link>
        </Button>
      </div>
    </Container>
  );
}