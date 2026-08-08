import { Button } from '@/components/ui/button';
import { Link } from 'next-view-transitions';

import ArrowLeft from '../svgs/ArrowLeft';
import ArrowUUpRight from '../svgs/ArrowUUpRight';

interface ProjectNavigationProps {
  previous: { title: string; slug: string } | null;
  next: { title: string; slug: string } | null;
}

export function ProjectNavigation({ previous, next }: ProjectNavigationProps) {
  if (!previous && !next) {
    return null;
  }

  return (
    <div>
      <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
        {/* Previous Project */}
        <div className={`${next ? '' : 'sm:col-span-2'}`}>
          {previous ? (
            <Button
              variant="outline"
              asChild
              className="group h-auto w-full justify-start p-3 sm:p-4 text-left"
              track={{
                name: 'button_click',
                data: {
                  buttonId: 'project_nav_previous',
                  section: 'project_detail',
                  action: previous.slug,
                },
              }}
            >
              <Link href={`/projects/${previous.slug}`}>
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <ArrowLeft className="size-4 shrink-0 transition-transform group-hover:-translate-x-1" />
                  <div className="min-w-0 flex-1">
                    <div className="text-muted-foreground text-xs">
                      Previous Project
                    </div>
                    <div className="truncate text-xs font-medium sm:text-sm">{previous.title}</div>
                  </div>
                </div>
              </Link>
            </Button>
          ) : (
            <div className="hidden sm:block h-16" />
          )}
        </div>

        {/* Next Project */}
        <div className={`${previous ? '' : 'sm:col-span-2'}`}>
          {next ? (
            <Button
              variant="outline"
              asChild
              className="group h-auto w-full justify-end p-3 sm:p-4 text-right"
              track={{
                name: 'button_click',
                data: {
                  buttonId: 'project_nav_next',
                  section: 'project_detail',
                  action: next.slug,
                },
              }}
            >
              <Link href={`/projects/${next.slug}`}>
                <div className="flex items-center justify-end gap-2.5 sm:gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="text-muted-foreground text-xs">
                      Next Project
                    </div>
                    <div className="truncate text-xs font-medium sm:text-sm">{next.title}</div>
                  </div>
                  <ArrowUUpRight className="size-4 shrink-0 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            </Button>
          ) : (
            <div className="hidden sm:block h-16" />
          )}
        </div>
      </div>
    </div>
  );
}
