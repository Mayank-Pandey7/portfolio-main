import { about, mySkills } from '@/config/About';
import Image from 'next/image';
import React from 'react';

import Container from '../common/Container';
import SectionHeading from '../common/SectionHeading';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

export default function About() {
  return (
    <Container className="mt-12 sm:mt-20">
      <SectionHeading subHeading="About" heading="Me" />
      {/* About me */}
      <div className="mt-6 flex flex-col items-center gap-6 sm:mt-8 md:flex-row md:items-start md:gap-8">
        <Image
          src="/assets/logo.png"
          alt="About"
          width={240}
          height={240}
          className="border-secondary mx-auto size-44 shrink-0 rounded-md border-2 bg-blue-300 object-cover sm:size-52 md:mx-0 md:size-60 dark:bg-yellow-300"
        />
        <div className="min-w-0 flex-1 text-left">
          <h3 className="text-xl font-bold sm:text-2xl">{about.name}</h3>
          <p className="text-secondary mt-2 text-sm leading-relaxed sm:mt-4 sm:text-base">{about.description}</p>
          <p className="text-secondary mt-6 text-sm font-bold sm:mt-8 sm:text-base">Skills</p>
          <div className="mt-3 flex flex-wrap gap-2.5 sm:gap-3">
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
    </Container>
  );
}
