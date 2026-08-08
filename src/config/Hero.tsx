import Github from '@/components/svgs/Github';
import Instagram from '@/components/svgs/Instagram';
import LinkedIn from '@/components/svgs/LinkedIn';
import Mail from '@/components/svgs/Mail';
import X from '@/components/svgs/X';
import YouTube from '@/components/svgs/YouTube';
import Bun from '@/components/technologies/Bun';
import JavaScript from '@/components/technologies/JavaScript';
import MongoDB from '@/components/technologies/MongoDB';
import NextJs from '@/components/technologies/NextJs';
import NodeJs from '@/components/technologies/NodeJs';
import PostgreSQL from '@/components/technologies/PostgreSQL';
import Prisma from '@/components/technologies/Prisma';
import ReactIcon from '@/components/technologies/ReactIcon';
// Technology Components
import TypeScript from '@/components/technologies/TypeScript';


export const skillComponents = {
  TypeScript: TypeScript,
  ReactIcon: ReactIcon,
  NextJs: NextJs,
  Bun: Bun,
  PostgreSQL: PostgreSQL,
  NodeJs: NodeJs,
  MongoDB: MongoDB,
  Prisma: Prisma,
  JavaScript: JavaScript,
};

export type HeroButton = {
  variant: 'outline' | 'default';
  text: string;
  href: string;
  icon: string;
};

export const heroConfig = {
  name: 'Mayank Pandey',
  title: 'Full Stack Web Developer.',
  avatar: '/assets/logo.png',

  skills: [
    {
      name: 'React',
      href: 'https://react.dev/',
      component: 'ReactIcon',
    },
    {
      name: 'Typescript',
      href: 'https://www.typescriptlang.org/',
      component: 'TypeScript',
    },
    {
      name: 'Next.js',
      href: 'https://nextjs.org/',
      component: 'NextJs',
    },
  ],

  description: {
    template:
      'Love to build cool stuff.',
  },

  buttons: [] as HeroButton[],
};

export const socialLinks = [
  {
    name: 'X',
    href: 'https://x.com/maynkio',
    icon: <X />,
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/mynkdev/',
    icon: <LinkedIn />,
  },
  {
    name: 'Github',
    href: 'https://github.com/Mayank-Pandey7',
    icon: <Github />,
  },
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/@nomad.mayank',
    icon: <YouTube />,
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/mayank__pandeyy',
    icon: <Instagram />,
  },
  {
    name: 'Email',
    href: 'mailto:mayankpandey0717@gmail.com',
    icon: <Mail />,
  },
];

export const spotifyConfig = {
  status: 'Last played',
  song: 'São Paulo (feat. Anitta)',
  artist: 'The Weeknd, Anitta',
  href: 'https://open.spotify.com/search/S%C3%A3o%20Paulo%20The%20Weeknd',
};
