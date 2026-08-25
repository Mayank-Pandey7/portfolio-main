import Container from '@/components/common/Container';
import { booksData } from '@/config/Personal';
import Image from 'next/image';
import React from 'react';

export default function BooksPage() {
  return (
    <Container className="mx-auto max-w-3xl py-10 space-y-8">
      
      <div className="space-y-3 text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          Books
        </h1>
        <p className="text-muted-foreground mx-auto max-w-xl text-sm sm:text-base">
          Books that have influenced my thinking, mindset, and personal growth.
        </p>
      </div>

      
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 md:grid-cols-4">
        {booksData.map((book) => (
          <div
            key={book.title}
            className="group flex flex-col items-center text-center space-y-2.5 rounded-xl border border-neutral-200/60 bg-card p-3 shadow-xs transition-all hover:border-neutral-400 dark:border-neutral-800/60 dark:hover:border-neutral-700"
          >
            <div className="relative aspect-[2/3] w-full overflow-hidden rounded-md bg-muted">
              <Image
                src={book.image}
                alt={book.title}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                unoptimized
              />
            </div>
            <div className="space-y-1">
              <h3 className="line-clamp-2 text-xs font-semibold sm:text-sm text-foreground">
                {book.title}
              </h3>
              <p className="line-clamp-1 text-[11px] text-muted-foreground">
                by {book.author}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
