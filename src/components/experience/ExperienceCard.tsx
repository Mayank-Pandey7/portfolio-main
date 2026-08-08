'use client';

import { type Experience } from '@/config/Experience';
import { cn } from '@/lib/utils';
import { Link } from 'next-view-transitions';
import Image from 'next/image';
import React, { useState } from 'react';

import Skill from '../common/Skill';
import Github from '../svgs/Github';
import LinkedIn from '../svgs/LinkedIn';
import Website from '../svgs/Website';
import X from '../svgs/X';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

interface ExperienceCardProps {
  experience: Experience;
  expandable?: boolean;
  showImage?: boolean;
  showSocials?: boolean;
}

const parseDescription = (text: string): string => {
  return text.replace(/\*(.*?)\*/g, '<b>$1</b>');
};

export function ExperienceCard({
  experience,
  expandable = true,
  showImage = true,
  showSocials = true,
}: ExperienceCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="group flex flex-col pb-4 last:pb-0">
      <div className="flex w-full items-start justify-between gap-3">
        <div className="flex min-w-0 flex-1 items-start gap-3 sm:gap-4">
          {showImage && (
            <Image
              src={experience.image}
              alt={experience.company}
              width={100}
              height={100}
              className="size-10 shrink-0 rounded-md object-cover sm:size-12"
            />
          )}

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <h3
                className={cn(
                  'text-base font-bold tracking-tight sm:text-lg',
                  experience.isBlur ? 'blur-[5px]' : 'blur-none',
                )}
              >
                {experience.company}
              </h3>

              {experience.isCurrent && (
                <div className="flex shrink-0 items-center gap-1 rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-xs font-medium whitespace-nowrap text-emerald-500">
                  <div className="size-1.5 shrink-0 animate-pulse rounded-full bg-emerald-500" />
                  Working
                </div>
              )}

              {showSocials && (
                <>
                  {experience.website && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          href={experience.website}
                          target="_blank"
                          className="hover:text-foreground size-4 shrink-0 text-neutral-500 transition-colors"
                        >
                          <Website />
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>Visit Website</TooltipContent>
                    </Tooltip>
                  )}

                  {experience.x && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          href={experience.x}
                          target="_blank"
                          className="hover:text-foreground size-4 shrink-0 text-neutral-500 transition-colors"
                        >
                          <X />
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>Follow on X</TooltipContent>
                    </Tooltip>
                  )}

                  {experience.linkedin && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          href={experience.linkedin}
                          target="_blank"
                          className="hover:text-foreground size-4 shrink-0 text-neutral-500 transition-colors"
                        >
                          <LinkedIn />
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>Connect on LinkedIn</TooltipContent>
                    </Tooltip>
                  )}

                  {experience.github && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          href={experience.github}
                          target="_blank"
                          className="hover:text-foreground size-4 shrink-0 text-neutral-500 transition-colors"
                        >
                          <Github />
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>View GitHub</TooltipContent>
                    </Tooltip>
                  )}
                </>
              )}

              {expandable && (
                <button
                  type="button"
                  onClick={() => setIsOpen((prev) => !prev)}
                  aria-expanded={isOpen}
                  aria-label={
                    isOpen
                      ? `Hide ${experience.company} details`
                      : `Show ${experience.company} details`
                  }
                  className={cn(
                    'cursor-pointer p-0.5 text-sm text-neutral-400 opacity-0 transition-all duration-200 group-hover:opacity-100 hover:text-foreground sm:text-base',
                  )}
                >
                  <span
                    className={cn(
                      'inline-block transition-transform duration-300',
                      isOpen && 'rotate-90',
                    )}
                  >
                    &gt;
                  </span>
                </button>
              )}
            </div>

            <p className="text-muted-foreground mt-0.5 text-xs font-normal sm:text-sm">
              {experience.position}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 flex-col items-end text-right text-xs text-secondary sm:text-sm">
          <p className="font-normal whitespace-nowrap text-neutral-400">
            {experience.startDate} -{' '}
            {experience.isCurrent ? 'Present' : experience.endDate}
          </p>

          <p className="text-muted-foreground mt-0.5 text-xs whitespace-nowrap">
            {experience.location}
          </p>
        </div>
      </div>

      {expandable ? (
        <div
          className={cn(
            'grid transition-all duration-300 ease-in-out',
            isOpen
              ? 'mt-2 grid-rows-[1fr] opacity-100'
              : 'grid-rows-[0fr] opacity-0',
          )}
        >
          <div className="overflow-hidden">
            <ExperienceDetails experience={experience} />
          </div>
        </div>
      ) : (
        <div className="mt-2">
          <ExperienceDetails experience={experience} />
        </div>
      )}
    </div>
  );
}

function ExperienceDetails({ experience }: { experience: Experience }) {
  return (
    <div className="pt-2 pb-2 pl-0 sm:pl-16">
      <div className="pt-1">
        <h4 className="text-muted-foreground mb-2 text-xs font-semibold sm:text-sm">
          Technologies
        </h4>

        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {experience.technologies.map((technology, techIndex: number) => (
            <Skill
              key={techIndex}
              name={technology.name}
              href={technology.href}
            >
              {technology.icon}
            </Skill>
          ))}
        </div>
      </div>

      <div className="text-secondary mt-4 flex flex-col gap-1.5 text-xs leading-relaxed sm:text-sm">
        {experience.description.map(
          (description: string, descIndex: number) => (
            <p
              key={descIndex}
              className="break-words"
              dangerouslySetInnerHTML={{
                __html: `• ${parseDescription(description)}`,
              }}
            />
          ),
        )}
      </div>
    </div>
  );
}