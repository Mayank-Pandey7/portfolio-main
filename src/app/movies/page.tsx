import Container from '@/components/common/Container';
import { moviesData } from '@/config/Personal';
import Image from 'next/image';
import React from 'react';

export default function MoviesPage() {
  return (
    <Container className="mx-auto max-w-3xl py-10 space-y-8">
      {/* Title & Description */}
      <div className="space-y-3 text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          Movies & Shows
        </h1>
        <p className="text-muted-foreground mx-auto max-w-xl text-sm sm:text-base">
          Films and shows that have inspired, entertained, and motivated me.
        </p>
      </div>

      {/* Movies Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 md:grid-cols-4">
        {moviesData.map((movie) => (
          <div
            key={movie.title}
            className="group flex flex-col items-center text-center space-y-2.5 rounded-xl border border-neutral-200/60 bg-card p-3 shadow-xs transition-all hover:border-neutral-400 dark:border-neutral-800/60 dark:hover:border-neutral-700"
          >
            <div className="relative aspect-[2/3] w-full overflow-hidden rounded-md bg-muted">
              <Image
                src={movie.image}
                alt={movie.title}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                unoptimized
              />
            </div>
            <h3 className="line-clamp-2 text-xs font-semibold sm:text-sm text-foreground">
              {movie.title}
            </h3>
          </div>
        ))}
      </div>
    </Container>
  );
}
