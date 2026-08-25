import Bun from '@/components/technologies/Bun';
import JavaScript from '@/components/technologies/JavaScript';
import MongoDB from '@/components/technologies/MongoDB';

import NextJs from '@/components/technologies/NextJs';
import NodeJs from '@/components/technologies/NodeJs';
import PostgreSQL from '@/components/technologies/PostgreSQL';
import Prisma from '@/components/technologies/Prisma';
import ReactIcon from '@/components/technologies/ReactIcon';
import TypeScript from '@/components/technologies/TypeScript';
import { Badge } from '@/components/ui/badge';
import React from 'react';

import { CodeCopyButton } from '../blog/CodeCopyButton';
import Interactive3DImage from '../common/Interactive3DImage';


const TechnologyComponents: Record<string, React.ComponentType> = {
  'Next.js': NextJs,
  nextjs: NextJs,
  React: ReactIcon,
  react: ReactIcon,
  TypeScript: TypeScript,
  typescript: TypeScript,
  JavaScript: JavaScript,
  javascript: JavaScript,
  'Node.js': NodeJs,
  nodejs: NodeJs,
  node: NodeJs,
  MongoDB: MongoDB,
  mongodb: MongoDB,
  PostgreSQL: PostgreSQL,
  postgresql: PostgreSQL,
  Prisma: Prisma,
  prisma: Prisma,
  Bun: Bun,
  bun: Bun,
};


const Technology = ({ name }: { name: string }) => {
  const TechComponent =
    TechnologyComponents[name] || TechnologyComponents[name.toLowerCase()];

  return (
    <div className="bg-muted/50 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium">
      {TechComponent && <TechComponent />}
      <span>{name}</span>
    </div>
  );
};


const TechStack = ({ technologies }: { technologies: string[] }) => {
  return (
    <div className="bg-muted/20 my-6 rounded-lg border p-4">
      <h4 className="mb-3 text-lg font-semibold">Technology Stack</h4>
      <div className="flex flex-wrap gap-2">
        {technologies.map((tech) => (
          <Technology key={tech} name={tech} />
        ))}
      </div>
    </div>
  );
};


const ProjectMeta = ({
  timeline,
  role,
  team,
  status,
}: {
  timeline?: string;
  role?: string;
  team?: string;
  status?: string;
}) => {
  return (
    <div className="bg-muted/20 my-6 grid grid-cols-2 gap-3 rounded-lg border p-3.5 sm:grid-cols-2 sm:gap-4 sm:p-4 lg:grid-cols-4">
      {timeline && (
        <div>
          <h5 className="text-muted-foreground text-xs font-semibold sm:text-sm">
            Timeline
          </h5>
          <p className="text-xs font-medium sm:text-sm">{timeline}</p>
        </div>
      )}
      {role && (
        <div>
          <h5 className="text-muted-foreground text-xs font-semibold sm:text-sm">
            Role
          </h5>
          <p className="text-xs font-medium sm:text-sm">{role}</p>
        </div>
      )}
      {team && (
        <div>
          <h5 className="text-muted-foreground text-xs font-semibold sm:text-sm">
            Team
          </h5>
          <p className="text-xs font-medium sm:text-sm">{team}</p>
        </div>
      )}
      {status && (
        <div>
          <h5 className="text-muted-foreground text-xs font-semibold sm:text-sm">
            Status
          </h5>
          <Badge
            variant={
              status === 'completed'
                ? 'default'
                : status === 'in-progress'
                  ? 'secondary'
                  : 'outline'
            }
            className="text-[11px] sm:text-xs"
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </div>
      )}
    </div>
  );
};


const Challenges = ({ challenges }: { challenges: string[] }) => {
  return (
    <div className="my-6 rounded-lg border border-yellow-200 bg-yellow-50 p-3.5 sm:p-4 dark:border-yellow-800 dark:bg-yellow-950/20">
      <h4 className="mb-3 text-base font-semibold text-yellow-800 sm:text-lg dark:text-yellow-200">
        Key Challenges
      </h4>
      <ul className="space-y-2">
        {challenges.map((challenge, index) => (
          <li
            key={index}
            className="flex items-start gap-2 text-xs text-yellow-700 sm:text-sm dark:text-yellow-300"
          >
            <span className="mt-1 block size-1.5 shrink-0 rounded-full bg-yellow-500 dark:bg-yellow-400" />
            {challenge}
          </li>
        ))}
      </ul>
    </div>
  );
};


const Learnings = ({ learnings }: { learnings: string[] }) => {
  return (
    <div className="my-6 rounded-lg border border-green-200 bg-green-50 p-3.5 sm:p-4 dark:border-green-800 dark:bg-green-950/20">
      <h4 className="mb-3 text-base font-semibold text-green-800 sm:text-lg dark:text-green-200">
        Key Learnings
      </h4>
      <ul className="space-y-2">
        {learnings.map((learning, index) => (
          <li
            key={index}
            className="flex items-start gap-2 text-xs text-green-700 sm:text-sm dark:text-green-300"
          >
            <span className="mt-1 block size-1.5 shrink-0 rounded-full bg-green-500 dark:bg-green-400" />
            {learning}
          </li>
        ))}
      </ul>
    </div>
  );
};

export const ProjectComponents = {
  img: ({
    src,
    alt,
    width = 1200,
    height = 675,
  }: {
    src?: string;
    alt?: string;
    width?: number;
    height?: number;
    [key: string]: unknown;
  }) => {
    if (!src) return null;
    return (
      <div className="my-6 aspect-video w-full overflow-hidden rounded-xl">
        <Interactive3DImage
          src={src}
          alt={alt || 'Project screenshot'}
          width={typeof width === 'string' ? parseInt(width, 10) : width}
          height={typeof height === 'string' ? parseInt(height, 10) : height}
          className="h-full w-full rounded-xl object-cover"
          containerClassName="w-full h-full"
        />
      </div>
    );
  },
  h1: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <h1 className="mb-4 text-2xl font-bold sm:text-4xl" {...props}>
      {children}
    </h1>
  ),
  h2: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <h2 className="mt-6 mb-3 text-xl font-semibold sm:text-3xl" {...props}>
      {children}
    </h2>
  ),
  h3: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <h3 className="mt-5 mb-2.5 text-lg font-medium sm:text-2xl" {...props}>
      {children}
    </h3>
  ),
  p: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <p className="text-muted-foreground mb-4 leading-7" {...props}>
      {children}
    </p>
  ),
  ul: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <ul className="mb-4 ml-6 list-disc space-y-2" {...props}>
      {children}
    </ul>
  ),
  ol: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <ol className="mb-4 ml-6 list-decimal space-y-2" {...props}>
      {children}
    </ol>
  ),
  li: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <li className="text-muted-foreground leading-7" {...props}>
      {children}
    </li>
  ),
  pre: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    [key: string]: unknown;
  }) => {
    const getTextContent = (node: React.ReactNode): string => {
      if (typeof node === 'string') {
        return node;
      }
      if (typeof node === 'number') {
        return String(node);
      }
      if (
        React.isValidElement(node) &&
        node.props &&
        typeof node.props === 'object'
      ) {
        return getTextContent(
          (node.props as { children?: React.ReactNode }).children,
        );
      }
      if (Array.isArray(node)) {
        return node.map(getTextContent).join('');
      }
      return '';
    };

    const codeText = getTextContent(children);

    return (
      <div className="group relative mb-4">
        <pre
          className="bg-muted/30 overflow-x-auto rounded-lg border p-4 text-sm [&>code]:bg-transparent [&>code]:p-0"
          {...props}
        >
          {children}
        </pre>
        <CodeCopyButton code={codeText} />
      </div>
    );
  },
  code: ({
    children,
    className,
    ...props
  }: {
    children: React.ReactNode;
    className?: string;
    [key: string]: unknown;
  }) => {
    if (className?.includes('language-')) {
      return (
        <code className={className} {...props}>
          {children}
        </code>
      );
    }

    return (
      <code className="rounded px-2 py-1 font-mono text-sm" {...props}>
        {children}
      </code>
    );
  },
  blockquote: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <blockquote
      className="border-primary text-muted-foreground mb-4 border-l-4 pl-4 italic"
      {...props}
    >
      {children}
    </blockquote>
  ),

  
  Technology,
  TechStack,
  ProjectMeta,
  Challenges,
  Learnings,
};
