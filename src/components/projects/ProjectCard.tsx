'use client';

import { useUmami } from '@/hooks/use-umami';
import type { AnalyticsEventData } from '@/types/analytics';
import { type Project } from '@/types/project';
import { Link } from 'next-view-transitions';
import React from 'react';

import ArrowRight from '../svgs/ArrowRight';
import Github from '../svgs/Github';
import Website from '../svgs/Website';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

interface ProjectCardProps {
  project: Project;
  isDimmed?: boolean;
  onHover?: () => void;
  onLeave?: () => void;
  showTechnologies?: boolean;
}

export function ProjectCard({
  project,
  isDimmed = false,
  onHover,
  onLeave,
  showTechnologies = true,
}: ProjectCardProps) {
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
    <div
      className={`group relative block py-2 transition-all duration-300 ease-in-out ${
        isDimmed
          ? 'scale-100 opacity-100 blur-none sm:scale-[0.995] sm:opacity-55 sm:blur-[1.0px]'
          : 'blur-0 scale-100 opacity-100'
      }`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Background Stretched Link to Project Details */}
      <Link
        href={project.projectDetailsPageSlug}
        onClick={() => trackProject('view_details')}
        className="absolute inset-0 z-0 cursor-pointer rounded-lg"
        aria-label={`View ${project.title} details`}
      />

      {/* Project Row Content */}
      <div className="pointer-events-none relative z-10 flex items-start justify-between gap-6">
        <div className="pointer-events-auto min-w-0 flex-1 space-y-1.5">
          {/* Title + Links + Status */}
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href={project.projectDetailsPageSlug}
              onClick={() => trackProject('view_details')}
              className="group-hover:text-primary cursor-pointer text-lg font-bold transition-colors"
            >
              <h3>{project.title}</h3>
            </Link>

            {/* Website */}
            {project.link && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground size-4 p-0.5 text-neutral-500 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      trackProject('visit_website');
                    }}
                  >
                    <Website />
                  </a>
                </TooltipTrigger>
                <TooltipContent>Visit Website</TooltipContent>
              </Tooltip>
            )}

            {/* GitHub */}
            {project.github && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground size-4 p-0.5 text-neutral-500 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      trackProject('visit_github');
                    }}
                  >
                    <Github />
                  </a>
                </TooltipTrigger>
                <TooltipContent>View GitHub</TooltipContent>
              </Tooltip>
            )}

            {/* Status (Desktop Only) */}
            <div
              className={`hidden items-center gap-1 rounded-md px-2 py-0.5 text-xs sm:flex ${
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
          </div>

          {/* Description */}
          <p className="text-secondary text-sm leading-relaxed font-normal">
            {project.description}
          </p>

          {/* Technology Icons */}
          {showTechnologies &&
            project.technologies &&
            project.technologies.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 pt-1">
                {project.technologies.map((technology, index) => (
                  <Tooltip key={index}>
                    <TooltipTrigger asChild>
                      <div className="size-5 cursor-pointer transition-transform duration-200 hover:scale-125">
                        {technology.icon}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{technology.name}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            )}
        </div>

        {/* View Details Link on Right */}
        <span className="group-hover:text-foreground pointer-events-none hidden shrink-0 items-center gap-1.5 pt-1 text-sm font-medium text-neutral-400 transition-colors sm:inline-flex">
          View details{' '}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </div>
  );
}
