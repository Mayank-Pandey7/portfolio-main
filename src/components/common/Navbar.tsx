import { navbarConfig } from '@/config/Navbar';
import React from 'react';

import Container from './Container';
import { ThemeToggleButton } from './ThemeSwitch';
import { TrackedLink } from './TrackedLink';

export default function Navbar() {
  return (
    <Container className="sticky top-0 z-20 rounded-md py-4 backdrop-blur-md bg-background/80">
      <div className="flex items-center justify-between px-6">
        <div className="flex items-center gap-5">
          <TrackedLink
            href="/"
            className="text-sm font-medium transition-colors hover:text-primary"
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

          <div className="flex items-center gap-4">
            {navbarConfig.navItems.map((item) => (
              <TrackedLink
                key={item.label}
                href={item.href}
                className="text-sm transition-colors hover:text-primary"
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

        <div className="flex items-center gap-4">
          <ThemeToggleButton variant="circle" start="top-right" blur />
        </div>
      </div>
    </Container>
  );
}