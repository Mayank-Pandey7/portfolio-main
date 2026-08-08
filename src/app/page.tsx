import Container from '@/components/common/Container';
import About from '@/components/landing/About';
import Blog from '@/components/landing/Blog';
import Experience from '@/components/landing/Experience';
import Github from '@/components/landing/Github';
import Hero from '@/components/landing/Hero';
import Work from '@/components/landing/Projects';
import Setup from '@/components/landing/Setup';
import React from 'react';

export default function page() {
  return (
    <Container className="min-h-screen pt-4 pb-16 sm:pt-6">
      <Hero />
      <Experience />
      <Work />
      <Blog />
      <About />
      <Github />
      <Setup />
    </Container>
  );
}
