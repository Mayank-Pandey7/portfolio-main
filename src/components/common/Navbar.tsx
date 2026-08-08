import { navbarConfig } from '@/config/Navbar';
import React from 'react';

import Container from './Container';
import { ThemeToggleButton } from './ThemeSwitch';
import { TrackedLink } from './TrackedLink';

export default function Navbar() {
  return (
    <Container className="sticky top-0 z-20 rounded-md py-3 sm:py-4 backdrop-blur-md bg-background/80">
      <div className="flex items-center justify-between px-1 sm:px-6">
        <div className="flex items-center gap-2.5 sm:gap-5">
          {/* Home Link */}
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
  );
}