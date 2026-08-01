import Appwrite from '@/components/technologies/Appwrite';
import Bun from '@/components/technologies/Bun';
import ExpressJs from '@/components/technologies/ExpressJs';
import Github from '@/components/technologies/Github';
import MDXIcon from '@/components/technologies/MDXIcon';
import MongoDB from '@/components/technologies/MongoDB';
import Netlify from '@/components/technologies/Netlify';
import NextJs from '@/components/technologies/NextJs';
import NodeJs from '@/components/technologies/NodeJs';
import PostgreSQL from '@/components/technologies/PostgreSQL';
import Prisma from '@/components/technologies/Prisma';
import ReactIcon from '@/components/technologies/ReactIcon';
import SocketIo from '@/components/technologies/SocketIo';
import TailwindCss from '@/components/technologies/TailwindCss';
import TypeScript from '@/components/technologies/TypeScript';
import Vercel from '@/components/technologies/Vercel';
import { Project } from '@/types/project';

export const projects: Project[] = [
  {
    title: 'SocialAi',
    description:
      'A full-stack AI-powered social media content generation platform that helps users create captions, post ideas, hashtags, and platform-specific ',
    image: '/project/notesbuddy.png',
    link: 'https://social-ai-dusky.vercel.app/',
    technologies: [
      { name: 'Next.js', icon: <NextJs key="nextjs" /> },
      { name: 'TypeScript', icon: <TypeScript key="typescript" /> },
      { name: 'React', icon: <ReactIcon key="react" /> },
      { name: 'Vercel', icon: <Vercel key="vercel" /> },
      { name: 'MongoDB', icon: <MongoDB key="mongodb" /> },
      { name: 'Tailwind CSS', icon: <TailwindCss key="tailwindcss" /> },
      { name: 'MDX', icon: <MDXIcon key="mdx" /> },
    ],
    github: 'https://github.com/Mayank-Pandey7/SocialAi',
    live: 'https://social-ai-dusky.vercel.app/',
    details: true,
    projectDetailsPageSlug: '/projects/notesbuddy',
    isWorking: true,
  },
  {
    title: 'LaunchDeck',
    description:
      'An all-in-one developer toolkit for generating SEO metadata, OG images, favicons, and converting data formats directly in the browser.',
    image: '/project/appwrite.png',
    link: 'https://launchdeck.vercel.app/',
    technologies: [
      { name: 'TypeScript', icon: <TypeScript key="typescript" /> },
      { name: 'React', icon: <ReactIcon key="react" /> },
      { name: 'Node.js', icon: <NodeJs key="nodejs" /> },
      { name: 'Bun', icon: <Bun key="bun" /> },
      { name: 'Vercel', icon: <Vercel key="vercel" /> },
      { name: 'Appwrite', icon: <Appwrite key="appwrite" /> },
    ],
    live: 'https://launchdeck.vercel.app/',
    details: true,
    projectDetailsPageSlug: '/projects/appwrite-mcp-server',
    isWorking: true,
  },
  {
    title: 'CSV Importer',
    description:
      'A web-based tool for uploading, validating, and processing CSV data for CRM and marketing workflows.',
    image: '/project/syncify.png',
    link: 'https://csv-importer-mayank.vercel.app/',
    technologies: [
      { name: 'React', icon: <ReactIcon key="react" /> },
      { name: 'Node.js', icon: <NodeJs key="nodejs" /> },
      { name: 'MongoDB', icon: <MongoDB key="mongodb" /> },
      { name: 'Vercel', icon: <Vercel key="vercel" /> },
      { name: 'Tailwind CSS', icon: <TailwindCss key="tailwindcss" /> },
    ],
    github: 'https://github.com/Mayank-Pandey7/CSV-importer',
    live: 'https://csv-importer-mayank.vercel.app/',
    details: true,
    projectDetailsPageSlug: '/projects/syncify',
    isWorking: true,
  },
  {
    title: 'Calendar App',
    description:
      'A responsive interactive calendar for viewing dates, creating monthly events, and managing schedules with an intuitive interface.',
    image: '/project/pasandida.png',
    link: 'https://calender-mauve-one.vercel.app/',
    technologies: [
      { name: 'Next.js', icon: <NextJs key="nextjs" /> },
      { name: 'TypeScript', icon: <TypeScript key="typescript" /> },
      { name: 'Prisma', icon: <Prisma key="prisma" /> },
      { name: 'PostgreSQL', icon: <PostgreSQL key="postgresql" /> },
      { name: 'Tailwind CSS', icon: <TailwindCss key="tailwindcss" /> },
      { name: 'Socket.io', icon: <SocketIo key="socketio" /> },
    ],
    github: 'https://github.com/Mayank-Pandey7/SocialAi',
    live: 'https://calender-mauve-one.vercel.app/',
    details: true,
    projectDetailsPageSlug: '/projects/pasandida-aurat',
    isWorking: true, // Currently in development
  },
  {
    title: "I'm a chill guy",
    description:
      'AI-powered GitHub profile roaster with intelligent analysis, witty commentary, and social sharing features',
    image: '/project/chillguy.png',
    link: '',
    technologies: [
      { name: 'React', icon: <ReactIcon key="react" /> },
      { name: 'Express.js', icon: <ExpressJs key="expressjs" /> },
      { name: 'Vercel', icon: <Vercel key="vercel" /> },
      { name: 'Tailwind CSS', icon: <TailwindCss key="tailwindcss" /> },
      { name: 'Netlify', icon: <Netlify key="netlify" /> },
      { name: 'GitHub', icon: <Github key="github" /> },
    ],
    github: '',
    live: '',
    details: true,
    projectDetailsPageSlug: '/projects/chill-guy',
    isWorking: false,
  },
];
