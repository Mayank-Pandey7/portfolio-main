import ExpressJs from '@/components/technologies/ExpressJs';
import Github from '@/components/technologies/Github';
import JavaScript from '@/components/technologies/JavaScript';
import MongoDB from '@/components/technologies/MongoDB';
import Netlify from '@/components/technologies/Netlify';
import NextJs from '@/components/technologies/NextJs';
import NodeJs from '@/components/technologies/NodeJs';
import ReactIcon from '@/components/technologies/ReactIcon';
import TailwindCss from '@/components/technologies/TailwindCss';
import TypeScript from '@/components/technologies/TypeScript';
import Vercel from '@/components/technologies/Vercel';
import { Project } from '@/types/project';

export const projects: Project[] = [
  {
    title: 'Devora',
    description:
      'An AI-powered developer career copilot featuring real-time AI mock interview simulations, ATS resume optimization with automated keyword gap analysis, and developer personality profiles.',
    image: '/project/devora.png',
    link: 'https://devora-mynk.vercel.app/',
    technologies: [
      { name: 'React', icon: <ReactIcon key="react" /> },
      { name: 'JavaScript', icon: <JavaScript key="javascript" /> },
      { name: 'Node.js', icon: <NodeJs key="nodejs" /> },
      { name: 'Express.js', icon: <ExpressJs key="expressjs" /> },
      { name: 'MongoDB', icon: <MongoDB key="mongodb" /> },
      { name: 'Tailwind CSS', icon: <TailwindCss key="tailwindcss" /> },
      { name: 'Vercel', icon: <Vercel key="vercel" /> },
    ],
    github: 'https://github.com/Mayank-Pandey7/Devora',
    live: 'https://devora-mynk.vercel.app/',
    details: true,
    projectDetailsPageSlug: '/projects/devora',
    isWorking: true,
  },
  {
    title: 'Marvel Timeline Explorer',
    description:
      'A cinematic Marvel interactive timeline, character archive, and multiversal relic provenance explorer across 44 MCU canonical entries with dynamic spatial canvas bezier threads.',
    image: '/project/marvel.png',
    link: 'https://marvel-mynk.vercel.app',
    technologies: [
      { name: 'Next.js', icon: <NextJs key="nextjs" /> },
      { name: 'TypeScript', icon: <TypeScript key="typescript" /> },
      { name: 'React', icon: <ReactIcon key="react" /> },
      { name: 'Tailwind CSS', icon: <TailwindCss key="tailwindcss" /> },
      { name: 'Vercel', icon: <Vercel key="vercel" /> },
    ],
    github: 'https://github.com/Mayank-Pandey7/Marvel',
    live: 'https://marvel-mynk.vercel.app',
    details: true,
    projectDetailsPageSlug: '/projects/marvel',
    isWorking: true,
  },
  {
    title: 'Trialshopy',
    description:
      'Smart AR Shopping Platform — virtual try-on, AI-driven product recommendations, and enterprise IoT analytics for modern retail.',
    image: '/project/trialshopy.png',
    link: 'https://trialshopy-mynk.vercel.app/',
    technologies: [
      { name: 'React', icon: <ReactIcon key="react" /> },
      { name: 'TypeScript', icon: <TypeScript key="typescript" /> },
      { name: 'Node.js', icon: <NodeJs key="nodejs" /> },
      { name: 'Tailwind CSS', icon: <TailwindCss key="tailwindcss" /> },
      { name: 'Vercel', icon: <Vercel key="vercel" /> },
    ],
    github: 'https://github.com/Mayank-Pandey7/nexus-ai',
    live: 'https://trialshopy-mynk.vercel.app/',
    details: true,
    projectDetailsPageSlug: '/projects/nexusai',
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
    projectDetailsPageSlug: '/projects/csv-importer',
    isWorking: true,
  },
  {
    title: 'Calendar',
    description:
      'A modern calendar web app for viewing dates, navigating months, and managing schedules with a clean and responsive interface.',
    image: '/project/calendar.png',
    link: 'https://calender-mynk.vercel.app/',
    technologies: [
      { name: 'React', icon: <ReactIcon key="react" /> },
      { name: 'JavaScript', icon: <JavaScript key="javascript" /> },
      { name: 'Tailwind CSS', icon: <TailwindCss key="tailwindcss" /> },
      { name: 'Vercel', icon: <Vercel key="vercel" /> },
    ],
    github: 'https://github.com/Mayank-Pandey7/calender',
    live: 'https://calender-mynk.vercel.app/',
    details: true,
    projectDetailsPageSlug: '/projects/calander',
    isWorking: true,
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
      { name: 'Github', icon: <Github key="github" /> },
    ],
    github: '',
    live: '',
    details: true,
    projectDetailsPageSlug: '/projects/chill-guy',
    isWorking: false,
  },
];
