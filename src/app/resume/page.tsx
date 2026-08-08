import Container from '@/components/common/Container';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { generateMetadata as getMetadata } from '@/config/Meta';
import { resumeConfig } from '@/config/Resume';
import { Download, ExternalLink } from 'lucide-react';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  ...getMetadata('/resume'),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function ResumePage() {
  const directUrl = resumeConfig.url.replace('/preview', '/view');

  return (
    <Container className="py-6 sm:py-10">
      <div className="space-y-5 sm:space-y-8">
        {/* Title & Action Buttons */}
        <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
              Resume
            </h1>
            <p className="text-muted-foreground text-xs sm:text-sm">
              My official curriculum vitae.
            </p>
          </div>

          <div className="flex w-full flex-wrap items-center justify-center gap-2.5 sm:w-auto">
            <Button variant="default" size="sm" asChild className="gap-2 text-xs sm:text-sm">
              <a href={directUrl} target="_blank" rel="noopener noreferrer">
                <Download className="size-4" />
                <span>Download PDF</span>
              </a>
            </Button>

            <Button variant="outline" size="sm" asChild className="gap-2 text-xs sm:text-sm">
              <a href={directUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="size-4" />
                <span>Open in New Tab</span>
              </a>
            </Button>
          </div>
        </div>

        <Separator />

        {/* Responsive PDF Viewer Container */}
        <div className="relative w-full overflow-hidden rounded-xl border border-neutral-200/80 bg-neutral-100 dark:border-neutral-800/80 dark:bg-neutral-900 shadow-sm">
          <iframe
            src={resumeConfig.url}
            title="Mayank Pandey Resume"
            className="h-[70vh] w-full sm:h-[82vh]"
            allow="autoplay"
          ></iframe>
        </div>
      </div>
    </Container>
  );
}
