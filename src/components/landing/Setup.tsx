import { ArrowRight } from 'lucide-react';
import React from 'react';

import Container from '../common/Container';
import SectionHeading from '../common/SectionHeading';
import { TrackedLink } from '../common/TrackedLink';
import Code from '../svgs/Code';
import Gear from '../svgs/Gear';
import { Card } from '../ui/card';

const setup = [
  {
    name: 'Gears Used',
    description: 'Productivity Tools, Gears i use to get my work done.',
    icon: <Gear className="size-4" />,
    href: '/gears',
  },
  {
    name: 'VS Code / Cursor Setup',
    description: 'VS Code / Cursor Setup i use daily.',
    icon: <Code className="size-4" />,
    href: '/setup',
  },
];

export default function Setup() {
  return (
    <Container className="mt-10 sm:mt-16">
      <SectionHeading subHeading="Development" heading="Setup" />
      <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:gap-4">
        {setup.map((item) => (
          <TrackedLink
            className="group"
            href={item.href}
            key={item.name}
            track={{
              name: 'button_click',
              data: { buttonId: item.name, section: 'setup' },
            }}
          >
            <Card className="flex flex-row items-center justify-between gap-3 px-3.5 py-2.5 sm:gap-4 sm:px-4 sm:py-3">
              <div className="bg-muted flex shrink-0 items-center justify-center rounded-md p-2">
                {item.icon}
              </div>
              <div className="flex min-w-0 flex-1 flex-col">
                <h3 className="text-sm font-semibold sm:text-base">{item.name}</h3>
                <p className="text-muted-foreground truncate text-xs sm:text-sm">
                  {item.description}
                </p>
              </div>
              <ArrowRight className="size-4 shrink-0 text-neutral-400 transition-transform group-hover:translate-x-1" />
            </Card>
          </TrackedLink>
        ))}
      </div>
    </Container>
  );
}
