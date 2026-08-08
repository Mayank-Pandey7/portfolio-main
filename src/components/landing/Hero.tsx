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
        <div className="flex items-center gap-3.5 sm:gap-5">
          <Image
            src={avatar}
            alt={name}
            width={120}
            height={120}
            priority
            className="relative -top-1 size-20 object-contain sm:-top-3 sm:size-28 shrink-0"
          />
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-bold tracking-tight sm:text-4xl">
              {name}
            </h1>

            <p className="text-secondary mt-0.5 text-sm sm:mt-1 sm:text-lg">
              {title}
            </p>
          </div>
        </div>

        <div className="text-secondary mt-4 flex flex-wrap items-center gap-x-1.5 gap-y-1.5 text-sm leading-relaxed sm:mt-6 sm:text-lg">
          {renderDescription()}
        </div>

        {/* Social Links */}
        <div className="mt-5 flex items-center gap-3.5 sm:mt-6 sm:gap-4">
          {socialLinks.map((link) => (
            <Tooltip key={link.name} delayDuration={0}>
              <TooltipTrigger asChild>
                <TrackedLink
                  href={link.href}
                  className="text-secondary transition-colors hover:text-foreground p-0.5"
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

        {/* Buttons: Resume & Contact (if specified) */}
        {buttons && buttons.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2.5 sm:mt-6 sm:gap-3">
            {buttons.map((button, index) => {
              const IconComponent =
                buttonIcons[button.icon as keyof typeof buttonIcons];

              return (
                <Button
                  key={index}
                  variant={button.variant as 'outline' | 'default'}
                  size="sm"
                  className={cn(
                    'px-3 py-1.5 text-xs sm:text-sm',
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
        )}
      </div>
    </Container>
  );
}