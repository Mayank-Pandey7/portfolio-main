import { about, mySkills } from '@/config/About';
import { CertificateIcon } from '@phosphor-icons/react/dist/ssr';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

import Container from '../common/Container';
import SectionHeading from '../common/SectionHeading';
import { TrackedLink } from '../common/TrackedLink';
import { Card } from '../ui/card';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

export default function About() {
  return (
    <Container className="mt-10 sm:mt-14">
      <SectionHeading subHeading="About" heading="Me" />
      {/* About me */}
      <div className="mt-4 flex flex-col gap-4 sm:mt-6 md:flex-row md:items-start md:gap-6">
        <Image
          src="/assets/logo.png"
          alt="About"
          width={240}
          height={240}
          className="border-secondary size-36 shrink-0 rounded-md border-2 bg-blue-300 object-cover sm:size-44 dark:bg-yellow-300"
        />
        <div className="min-w-0 flex-1">
          <h3 className="text-xl font-bold sm:text-2xl">{about.name}</h3>
          <p className="text-secondary mt-2 text-sm leading-relaxed sm:mt-3 sm:text-base">{about.description}</p>
          <p className="text-secondary mt-5 text-sm font-bold sm:mt-6 sm:text-base">Skills</p>
          <div className="mt-2.5 flex flex-wrap gap-2.5 sm:gap-3">
            {mySkills.map((skill) => (
              <Tooltip key={skill.key}>
                <TooltipTrigger asChild>
                  <div className="size-6 transition-transform hover:scale-125 hover:cursor-pointer">
                    {skill}
                  </div>
                </TooltipTrigger>
                <TooltipContent>{skill.key}</TooltipContent>
              </Tooltip>
            ))}
          </div>
        </div>
      </div>

      {/* Certificates & Achievements - Full Length */}
      <div className="mt-6 w-full sm:mt-8">
        <TrackedLink
          className="group block w-full"
          href="/journey/certificates"
          track={{
            name: 'button_click',
            data: {
              buttonId: 'Certificates & Achievements',
              section: 'about',
              action: '/journey/certificates',
            },
          }}
        >
          <Card className="flex w-full flex-row items-center justify-between gap-3 px-3.5 py-3 sm:gap-4 sm:px-4 sm:py-3.5">
            <div className="bg-muted flex shrink-0 items-center justify-center rounded-md p-2">
              <CertificateIcon className="size-4" />
            </div>
            <div className="flex min-w-0 flex-1 flex-col">
              <h3 className="text-sm font-semibold sm:text-base">Certificates & Achievements</h3>
              <p className="text-muted-foreground truncate text-xs sm:text-sm">
                A curated list of certificates and achievements.
              </p>
            </div>
            <ArrowRight className="size-4 shrink-0 text-neutral-400 transition-transform group-hover:translate-x-1" />
          </Card>
        </TrackedLink>
      </div>
    </Container>
  );
}
