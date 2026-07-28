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
}

const parseDescription = (text: string): string => {
  return text.replace(/\*(.*?)\*/g, '<b>$1</b>');
};

export function ExperienceCard({
  experience,
  expandable = true,
}: ExperienceCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="group flex flex-col border-b border-neutral-200/50 pb-6 last:border-0 last:pb-0 dark:border-neutral-800/60">
      {/* Experience Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        {/* Left Side - Logo & Company Info */}
        <div className="flex min-w-0 flex-1 items-start gap-3 sm:gap-4">
          {/* Company Logo */}
          <Image
            src={experience.image}
            alt={experience.company}
            width={100}
            height={100}
            className="size-10 shrink-0 rounded-md object-cover sm:size-12"
          />

          {/* Company Information */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <div className="flex min-w-0 flex-wrap items-center gap-1.5 sm:gap-2">
                {/* Company */}
                <h3
                  className={cn(
                    'text-base font-bold tracking-tight sm:text-lg',
                    experience.isBlur ? 'blur-[5px]' : 'blur-none',
                  )}
                >
                  {experience.company}
                </h3>

                {/* Website */}
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

                {/* X */}
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

                {/* LinkedIn */}
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

                {/* GitHub */}
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

                {/* Working Badge */}
                {experience.isCurrent && (
                  <div className="flex shrink-0 items-center gap-1 rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-xs font-medium whitespace-nowrap text-emerald-500">
                    <div className="size-1.5 shrink-0 animate-pulse rounded-full bg-emerald-500" />
                    Working
                  </div>
                )}
              </div>

              {/* Expand Arrow - Pinned to top-right of company row */}
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
                    'shrink-0 cursor-pointer p-1 text-base text-neutral-400 sm:text-lg',
                    'opacity-100 transition-all duration-200 sm:opacity-0 sm:group-hover:opacity-100',
                    'hover:text-foreground',
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

            {/* Role */}
            <p className="text-muted-foreground mt-0.5 text-xs font-normal sm:text-sm">
              {experience.position}
            </p>
          </div>
        </div>

        {/* Right Side - Dates & Location */}
        <div className="text-secondary flex w-full flex-row items-center justify-between pt-1.5 text-xs sm:w-auto sm:flex-col sm:items-end sm:justify-start sm:pt-0 sm:text-right sm:text-sm">
          <p className="shrink-0 font-medium">
            {experience.startDate} -{' '}
            {experience.isCurrent ? 'Present' : experience.endDate}
          </p>

          <p className="text-muted-foreground shrink-0 text-right text-xs">
            {experience.location}
          </p>
        </div>
      </div>

      {/* Details */}
      {expandable ? (
        /* Homepage: Expandable Details */
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
        /* Work Experience Page: Always Visible */
        <div className="mt-2">
          <ExperienceDetails experience={experience} />
        </div>
      )}
    </div>
  );
}

/* ----------------------------------------
   Experience Details
----------------------------------------- */

function ExperienceDetails({ experience }: { experience: Experience }) {
  return (
    <div className="pt-2 pb-2 pl-0 sm:pl-16">
      {/* Technologies */}
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

      {/* Description */}
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
/ /   E x p e r i e n c e   c a r d   r e s p o n s i v e   l a y o u t  
 / /   P i n   e x p a n d   a r r o w   b u t t o n  
 