import AWS from '@/components/technologies/AWS';
import BootStrap from '@/components/technologies/BootStrap';
import Bun from '@/components/technologies/Bun';
import CSS from '@/components/technologies/CSS';
import ExpressJs from '@/components/technologies/ExpressJs';
import Figma from '@/components/technologies/Figma';
import Html from '@/components/technologies/Html';
import JavaScript from '@/components/technologies/JavaScript';
import MongoDB from '@/components/technologies/MongoDB';
import NestJs from '@/components/technologies/NestJs';
import NextJs from '@/components/technologies/NextJs';
import NodeJs from '@/components/technologies/NodeJs';
import PostgreSQL from '@/components/technologies/PostgreSQL';
import Postman from '@/components/technologies/Postman';
import Prisma from '@/components/technologies/Prisma';
import ReactIcon from '@/components/technologies/ReactIcon';
import TailwindCss from '@/components/technologies/TailwindCss';
import TypeScript from '@/components/technologies/TypeScript';
import Vercel from '@/components/technologies/Vercel';

export interface Technology {
  name: string;
  href: string;
  icon: React.ReactNode;
}

export interface Experience {
  company: string;
  position: string;
  location: string;
  image: string;
  description: string[];
  startDate: string;
  endDate: string;
  website: string;
  x?: string;
  linkedin?: string;
  github?: string;
  technologies: Technology[];
  isCurrent: boolean;
  isBlur?: boolean;
}

export const experiences: Experience[] = [
  {
    isCurrent: true,
    isBlur: false,
    company: 'TrialShopy',
    position: 'Full Stack Developer Intern',
    location: 'Noida, India (Remote)',
    image: '/company/promote1.png',
    description: [
      'Architected and developed the complete frontend infrastructure for the platform, a comprehensive solution for creating and managing promotional campaigns.',
      'Led a comprehensive codebase refactoring initiative that improved maintainability, scalability, and development velocity across the entire platform.',
      'Integrated and optimized backend API connections, implementing efficient data fetching strategies and error handling mechanisms.',
      'Enhanced user experience and interface design through implementation of consistent design systems, accessibility standards, and performance optimizations.',
    ],
    startDate: 'July 2026',
    endDate: 'Present',
    technologies: [
      {
        name: 'Next.js',
        href: 'https://nextjs.org/',
        icon: <NextJs />,
      },
      {
        name: 'Tailwind CSS',
        href: 'https://tailwindcss.com/',
        icon: <TailwindCss />,
      },
      {
        name: 'TypeScript',
        href: 'https://typescriptlang.org/',
        icon: <TypeScript />,
      },
      {
        name: 'React',
        href: 'https://react.dev/',
        icon: <ReactIcon />,
      },
      {
        name: 'Figma',
        href: 'https://figma.com/',
        icon: <Figma />,
      },
      {
        name: 'Vercel',
        href: 'https://vercel.com/',
        icon: <Vercel />,
      },
      {
        name: 'AWS',
        href: 'https://aws.amazon.com/',
        icon: <AWS />,
      },
      {
        name: 'Bun',
        href: 'https://bun.sh/',
        icon: <Bun />,
      },
    ],
    website: 'https://replica-canvas-ui.lovable.app/',
    linkedin: 'https://www.linkedin.com/company/trialshopy/',
  },
  {
    isCurrent: false,
    company: 'TechBuzz Ideas',
    position: 'Frontend Developer Intern',
    location: 'Noida, India (On-Site)',
    image: '/company/upsurge.png',
    description: [
      'Built responsive and reusable React.js components, reducing UI development time across multiple pages.',
      'Collaborated with designers to convert Figma prototypes into production-ready interfaces with pixel-perfect accuracy',
      'Improved frontend performance, responsiveness, and accessibility using modern React development practices.',
      'Worked with Git and GitHub in a collaborative development workflow, participating in code reviews and feature development.',
    ],
    startDate: 'July 2025',
    endDate: 'Sep 2025',
    technologies: [
      {
        name: 'React',
        href: 'https://react.dev/',
        icon: <ReactIcon />,
      },
      {
        name: 'Vercel',
        href: 'https://vercel.com/',
        icon: <Vercel />,
      },
      {
        name: 'Figma',
        href: 'https://figma.com/',
        icon: <Figma />,
      },
      {
        name: 'Tailwind CSS',
        href: 'https://tailwindcss.com/',
        icon: <TailwindCss />,
      },
    ],
    website: 'https://www.techbuzzideas.com/',
    linkedin: 'https://www.linkedin.com/company/techbuzzideas/',
  },
  {
    isCurrent: false,
    company: 'Freelance',
    position: 'Frontend Developer',
    location: 'Remote, India',
    image: '/company/prepeasy.png',
    description: [
      'Independently architected and developed end-to-end full-stack solutions for core product features, resulting in 95% cost reduction in AI interview services.',
      'Single-handedly engineered and deployed a scalable AI Interview Platform, implementing real-time leaderboard analytics and automated personalized interview feedback system, reducing per-session costs from *$7* to *$0.30*.',
      'Designed and developed comprehensive AI Resume Builder with automated optimization features, increasing user engagement by generating tailored resume recommendations and industry-specific summaries.',
      'Built and integrated an AI-powered Cover Letter Generator with customizable templates, improving user application success rates through personalized content generation.',
      'Engineered a complete Learning Management System (LMS) with an integrated Quiz Platform, featuring progress tracking and performance analytics.',
    ],
    startDate: 'January 2025',
    endDate: 'June 2025',
    technologies: [
      {
        name: 'Next.js',
        href: 'https://nextjs.org/',
        icon: <NextJs />,
      },
      {
        name: 'Express',
        href: 'https://expressjs.com/',
        icon: <ExpressJs />,
      },
      {
        name: 'TypeScript',
        href: 'https://www.typescriptlang.org/',
        icon: <TypeScript />,
      },
      {
        name: 'React',
        href: 'https://react.dev/',
        icon: <ReactIcon />,
      },
      {
        name: 'Prisma',
        href: 'https://www.prisma.io/',
        icon: <Prisma />,
      },
      {
        name: 'PostgreSQL',
        href: 'https://www.postgresql.org/',
        icon: <PostgreSQL />,
      },
      {
        name: 'Vercel',
        href: 'https://vercel.com/',
        icon: <Vercel />,
      },
      {
        name: 'AWS',
        href: 'https://aws.amazon.com/',
        icon: <AWS />,
      },
      {
        name: 'Postman',
        href: 'https://www.postman.com/',
        icon: <Postman />,
      },
      {
        name: 'Bun',
        href: 'https://bun.sh/',
        icon: <Bun />,
      },
    ],
    website: 'https://prepeasy.ai',
    github: 'https://github.com/prepeasy',
  },
  
  {
    isCurrent: false,
    company: 'Octanet Services Pvt. Ltd.',
    position: 'Web Developer Intern',
    location: 'Remote, India ',
    image: '/company/loop.png',
    description: [
      'Developed and maintained web applications using HTML, CSS, and JavaScript.',
      'Collaborated with cross-functional teams to deliver high-quality software on time.',
      'Design & Developed multiple websites for clients.',
    ],
    startDate: 'Aug 2024',
    endDate: 'Sep 2024',
    website: 'https://www.octanet.in',
    technologies: [
      {
        name: 'HTML',
        href: 'https://html.com/',
        icon: <Html />,
      },
      {
        name: 'CSS',
        href: 'https://css.com/',
        icon: <CSS />,
      },
      {
        name: 'JavaScript',
        href: 'https://javascript.com/',
        icon: <JavaScript />,
      },
      {
        name: 'Figma',
        href: 'https://figma.com/',
        icon: <Figma />,
      },
      {
        name: 'BootStrap',
        href: 'https://getbootstrap.com/',
        icon: <BootStrap />,
      },
    ],
    linkedin: 'https://www.linkedin.com/company/octanetservices/',
  },
];
