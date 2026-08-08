import { type Experience, experiences } from '@/config/Experience';
import { Link } from 'next-view-transitions';
import React from 'react';

import Container from '../common/Container';
import SectionHeading from '../common/SectionHeading';
import { ExperienceCard } from '../experience/ExperienceCard';
import { Button } from '../ui/button';

export default function Experience() {
  return (
    <Container className="mt-10 sm:mt-14">
      <SectionHeading heading="Experience" />
      <div className="mt-4 flex flex-col gap-5 sm:gap-6">
        {experiences.slice(0, 3).map((experience: Experience) => (
          <ExperienceCard key={experience.company} experience={experience} showImage={false} showSocials={false} />
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <Button
          variant="outline"
          track={{
            name: 'button_click',
            data: { buttonId: 'show_all_experiences', section: 'experience' },
          }}
        >
          <Link href="/work-experience">Show all work experiences</Link>
        </Button>
      </div>
    </Container>
  );
}
