'use client';

import { type Project } from '@/types/project';
import React, { useState } from 'react';

import { ProjectCard } from './ProjectCard';

interface ProjectListProps {
  projects: Project[];
  className?: string;
  disableBlur?: boolean;
  showTechnologies?: boolean;
}

export function ProjectList({
  projects,
  className,
  disableBlur = false,
  showTechnologies = true,
}: ProjectListProps) {
  const [hoveredTitle, setHoveredTitle] = useState<string | null>(null);

  if (projects.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-muted-foreground">No projects found.</p>
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col gap-2 ${className ?? ''}`}
      onMouseLeave={() => !disableBlur && setHoveredTitle(null)}
    >
      {projects.map((project: Project) => (
        <ProjectCard
          key={project.title}
          project={project}
          isDimmed={!disableBlur && hoveredTitle !== null && hoveredTitle !== project.title}
          onHover={() => !disableBlur && setHoveredTitle(project.title)}
          onLeave={() => !disableBlur && setHoveredTitle(null)}
          showTechnologies={showTechnologies}
        />
      ))}
    </div>
  );
}
