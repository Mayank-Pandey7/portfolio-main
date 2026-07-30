'use client';

import { githubConfig } from '@/config/Github';
import Link from 'next/link';
import { useState } from 'react';

import Container from '../common/Container';
import GithubIcon from '../svgs/Github';
import { Button } from '../ui/button';

export default function Github() {
  const [hasError, setHasError] = useState(false);

  return (
    <Container className="mt-20">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-foreground text-2xl font-bold">
              {githubConfig.title}
            </h2>
            <p className="text-muted-foreground text-sm">
              <b>{githubConfig.username}</b>&apos;s {githubConfig.subtitle}
            </p>
          </div>
        </div>

        {/* Content */}
        {hasError ? (
          <div className="text-muted-foreground border-border rounded-xl border-2 border-dashed p-8 text-center">
            <div className="bg-muted mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
              <GithubIcon className="h-8 w-8" />
            </div>
            <p className="mb-2 font-medium">{githubConfig.errorState.title}</p>
            <p className="mb-4 text-sm">
              {githubConfig.errorState.description}
            </p>
            <Button
              variant="outline"
              asChild
              track={{
                name: 'external_link_click',
                data: {
                  url: `https://github.com/${githubConfig.username}`,
                  text: githubConfig.errorState.buttonText,
                  location: 'github_section',
                },
              }}
            >
              <Link
                href={`https://github.com/${githubConfig.username}`}
                className="inline-flex items-center gap-2"
              >
                <GithubIcon className="h-4 w-4" />
                {githubConfig.errorState.buttonText}
              </Link>
            </Button>
          </div>
        ) : (
          <div className="relative overflow-hidden">
            <div className="bg-background/50 relative rounded-lg border border-dashed border-black/20 p-6 backdrop-blur-sm dark:border-white/10">
              <div className="w-full overflow-x-auto">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://ghchart.rzero.dev/${githubConfig.username}`}
                  alt={`${githubConfig.username}'s GitHub contribution graph`}
                  className="min-w-[600px]"
                  onError={() => setHasError(true)}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
}