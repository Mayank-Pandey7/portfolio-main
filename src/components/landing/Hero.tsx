import { heroConfig, skillComponents, socialLinks } from '@/config/Hero';
import { parseTemplate } from '@/lib/hero';
import { cn } from '@/lib/utils';
import { Link } from 'next-view-transitions';
import Image from 'next/image';
import React from 'react';

import Container from '../common/Container';
import Skill from '../common/Skill';
import { TrackedLink } from '../common/TrackedLink';
import CV from '../svgs/CV';
import Chat from '../svgs/Chat';
import { Button } from '../ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

const buttonIcons = {
  CV,
  Chat,
};

export default function Hero() {
  const { name, title, avatar, skills, description, buttons } = heroConfig;

  const renderDescription = () => {
    const parts = parseTemplate(description.template, skills);

    return parts.map((part) => {
      if (part.type === 'skill' && 'skill' in part && part.skill) {
        const SkillComponent =
          skillComponents[
            part.skill.component as keyof typeof skillComponents
          ];

        return (
          <Skill key={part.key} name={part.skill.name} href={part.skill.href}>
            <SkillComponent />
          </Skill>
        );
      }

      if (part.type === 'bold' && 'text' in part) {
        return (
          <b key={part.key} className="text-primary whitespace-pre-wrap">
            {part.text}
          </b>
        );
      }

      if (part.type === 'text' && 'text' in part) {
        return (
          <span key={part.key} className="whitespace-pre-wrap">
            {part.text}
          </span>
        );
      }

      return null;
    });
  };

  return (
    <Container className="pt-0">
      <div className="max-w-3xl">
        <div className="flex items-center gap-4">
          <Image
            src={avatar}
            alt={name}
            width={120}
            height={120}
            priority
            className="relative -top-2 size-24 object-contain sm:-top-3 sm:size-28"
          />
          <div className="min-w-0">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {name}
            </h1>

            <p className="text-secondary mt-1 text-base sm:text-lg">
              {title}
            </p>
          </div>
        </div>

        <div className="text-secondary mt-6 flex flex-wrap items-center gap-x-1.5 gap-y-2 text-base leading-relaxed sm:text-lg">
          {renderDescription()}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {buttons.map((button, index) => {
            const IconComponent =
              buttonIcons[button.icon as keyof typeof buttonIcons];

            return (
              <Button
                key={index}
                variant={button.variant as 'outline' | 'default'}
                size="sm"
                className={cn(
                  button.variant === 'outline' && 'inset-shadow-indigo-500',
                  button.variant === 'default' && 'inset-shadow-indigo-500',
                )}
                track={{
                  name: 'button_click',
                  data: {
                    buttonId: button.text,
                    section: 'hero',
                  },
                }}
              >
                {IconComponent && <IconComponent />}
                <Link href={button.href}>{button.text}</Link>
              </Button>
            );
          })}
        </div>

        <div className="mt-6 flex items-center gap-3">
          {socialLinks.map((link) => (
            <Tooltip key={link.name} delayDuration={0}>
              <TooltipTrigger asChild>
                <TrackedLink
                  href={link.href}
                  className="text-secondary transition-colors hover:text-foreground"
                  track={{
                    name: 'external_link_click',
                    data: {
                      url: link.href,
                      text: link.name,
                      location: 'hero_social',
                    },
                  }}
                >
                  <span className="block size-5">{link.icon}</span>
                </TrackedLink>
              </TooltipTrigger>

              <TooltipContent>
                <p>{link.name}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>
    </Container>
  );
}