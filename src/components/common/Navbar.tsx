import { navbarConfig } from '@/config/Navbar';
import React from 'react';

import Container from './Container';
import { ThemeToggleButton } from './ThemeSwitch';
import { TrackedLink } from './TrackedLink';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full">
      
      <div className="pointer-events-none absolute inset-x-0 top-0 h-14 sm:h-16 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/70 to-transparent" />
        <div
          className="absolute inset-0 backdrop-blur-sm [mask-image:linear-gradient(to_bottom,black_0%,black_70%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_70%,transparent_100%)]"
        />
        <div
          className="absolute inset-0 backdrop-blur-md [mask-image:linear-gradient(to_bottom,black_0%,black_45%,transparent_85%)] [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_45%,transparent_85%)]"
        />
        <div
          className="absolute inset-0 backdrop-blur-xl [mask-image:linear-gradient(to_bottom,black_0%,black_25%,transparent_65%)] [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_25%,transparent_65%)]"
        />
      </div>

      <Container className="py-2 sm:py-2.5">
        <div className="flex items-center justify-between px-1 sm:px-6">
          <div className="flex items-center gap-2.5 sm:gap-5">
            <TrackedLink
              href="/"
              className="text-xs sm:text-sm font-medium transition-colors hover:text-primary"
              track={{
                name: 'button_click',
                data: {
                  buttonId: 'home',
                  section: 'navbar',
                },
              }}
            >
              Home
            </TrackedLink>

            <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm">
              {navbarConfig.navItems.map((item) => (
                <TrackedLink
                  key={item.label}
                  href={item.href}
                  className="text-xs sm:text-sm font-medium transition-colors hover:text-primary"
                  track={{
                    name: 'button_click',
                    data: {
                      buttonId: item.label,
                      section: 'navbar',
                    },
                  }}
                >
                  {item.label}
                </TrackedLink>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <ThemeToggleButton variant="circle" start="top-right" blur />
          </div>
        </div>
      </Container>
    </header>
  );
}