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
    <div className="group flex flex-col">
      {/* Experience Header */}
      <div className="flex flex-col gap-2 py-3 md:flex-row md:items-center md:justify-between">
        {/* Left Side */}
        <div className="flex items-center gap-4">
          {/* Company Logo */}
          <Image
            src={experience.image}
            alt={experience.company}
            width={100}
            height={100}
            className="size-12 rounded-md"
          />

          {/* Company Information */}
          <div className="flex flex-col">
            <div className="flex flex-wrap items-center gap-2">
              {/* Company */}
              <h3
                className={cn(
                  'text-lg font-bold',
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
                      className="hover:text-foreground size-4 text-neutral-500 transition-colors"
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
                      className="hover:text-foreground size-4 text-neutral-500 transition-colors"
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
                      className="hover:text-foreground size-4 text-neutral-500 transition-colors"
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
                      className="hover:text-foreground size-4 text-neutral-500 transition-colors"
                    >
                      <Github />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>View GitHub</TooltipContent>
                </Tooltip>
              )}

              {/* Working */}
              {experience.isCurrent && (
                <div className="flex items-center gap-1 rounded-md border-green-300 bg-green-500/10 px-2 py-1 text-xs">
                  <div className="size-2 animate-pulse rounded-full bg-green-500" />
                  Working
                </div>
              )}

              {/* Expand Arrow - Homepage Only */}
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
                    'cursor-pointer text-lg text-neutral-500',
                    'opacity-0 transition-all duration-200',
                    'group-hover:opacity-100',
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
            <p className="text-sm font-normal">{experience.position}</p>
          </div>
        </div>

        {/* Right Side */}
        <div className="text-secondary flex flex-col text-sm md:text-right">
          <p>
            {experience.startDate} -{' '}
            {experience.isCurrent ? 'Present' : experience.endDate}
          </p>

          <p>{experience.location}</p>
        </div>
      </div>

      {/* Details */}
      {expandable ? (
        /* Homepage: Expandable Details */
        <div
          className={cn(
            'grid transition-all duration-300 ease-in-out',
            isOpen
              ? 'grid-rows-[1fr] opacity-100'
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
    <div className="pb-6 pl-16">
      {/* Technologies */}
      <div className="pt-2">
        <h4 className="mb-3 text-sm font-semibold">Technologies</h4>

        <div className="flex flex-wrap gap-2">
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
      <div className="text-secondary mt-5 flex flex-col gap-1 text-sm leading-6">
        {experience.description.map(
          (description: string, descIndex: number) => (
            <p
              key={descIndex}
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
