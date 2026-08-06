'use client';

import { useUmami } from '@/hooks/use-umami';
import type { AnalyticsEventData } from '@/types/analytics';
import { type Project } from '@/types/project';
import { Link } from 'next-view-transitions';
import React, { useState } from 'react';

import ArrowRight from '../svgs/ArrowRight';
import Github from '../svgs/Github';
import Website from '../svgs/Website';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { trackEvent } = useUmami();

  const projectId =
    project.projectDetailsPageSlug.split('/').filter(Boolean).pop() ??
    project.title;

  const trackProject = (
    action: AnalyticsEventData['project_click']['action'],
  ) =>
    trackEvent({
      name: 'project_click',
      data: {
        projectId,
        projectTitle: project.title,
        action,
        location: 'project_list',
      },
    });

  return (
    <div className="group flex flex-col">
      {/* Project Row */}
      <div className="flex flex-col gap-2 py-3">
        <div className="flex min-w-0 flex-col">
          {/* Title + Links + Status + Arrow */}
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href={project.projectDetailsPageSlug}
              onClick={() => trackProject('view_details')}
            >
              <h3 className="hover:text-primary text-lg font-bold transition-colors">
                {project.title}
              </h3>
            </Link>

            {/* Website */}
            {project.link && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={project.link}
                    target="_blank"
                    className="hover:text-foreground size-4 text-neutral-500 transition-colors"
                    onClick={() => trackProject('visit_website')}
                  >
                    <Website />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>Visit Website</TooltipContent>
              </Tooltip>
            )}

            {/* GitHub */}
            {project.github && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={project.github}
                    target="_blank"
                    className="hover:text-foreground size-4 text-neutral-500 transition-colors"
                    onClick={() => trackProject('visit_github')}
                  >
                    <Github />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>View GitHub</TooltipContent>
              </Tooltip>
            )}

            {/* Status */}
            <div
              className={`flex items-center gap-1 rounded-md px-2 py-1 text-xs ${
                project.isWorking ? 'bg-green-500/10' : 'bg-red-500/10'
              }`}
            >
              <div
                className={`size-2 animate-pulse rounded-full ${
                  project.isWorking ? 'bg-green-500' : 'bg-red-500'
                }`}
              />

              {project.isWorking ? 'All Systems Operational' : 'Building'}
            </div>

            {/* Expand Arrow */}
            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              aria-expanded={isOpen}
              aria-label={
                isOpen
                  ? `Hide ${project.title} details`
                  : `Show ${project.title} details`
              }
              className="hover:text-foreground cursor-pointer text-lg text-neutral-500 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            >
              <span
                className={`inline-block transition-transform duration-300 ${
                  isOpen ? 'rotate-90' : ''
                }`}
              >
                &gt;
              </span>
            </button>
          </div>

          {/* Description */}
          <p className="text-secondary text-sm font-normal">
            {project.description}
          </p>
        </div>
      </div>

      {/* Expandable Details */}
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="pb-5">
            {/* Technologies */}
            <div className="pt-2">
              <h4 className="mb-3 text-sm font-semibold">Technologies</h4>

              <div className="flex flex-wrap gap-2">
                {project.technologies.map((technology, index) => (
                  <Tooltip key={index}>
                    <TooltipTrigger asChild>
                      <div className="size-6 transition-all duration-300 hover:scale-120 hover:cursor-pointer">
                        {technology.icon}
                      </div>
                    </TooltipTrigger>

                    <TooltipContent>
                      <p>{technology.name}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </div>

            {/* View Details */}
            <div className="mt-4">
              <Link
                href={project.projectDetailsPageSlug}
                className="text-secondary hover:text-primary inline-flex items-center gap-2 text-sm underline-offset-4 transition-colors hover:underline"
                onClick={() => trackProject('view_details')}
              >
                View Details
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
