'use client';

import { githubConfig } from '@/config/Github';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';

import Container from '../common/Container';
import GithubIcon from '../svgs/Github';
import { Button } from '../ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

type Contribution = {
  date: string;
  count: number;
  level: number;
};
type ContributionResponse = {
  username: string;
  totalContributions: number;
  colors: string[];
  weeks: {
    firstDay: string;
    contributionDays: {
      date: string;
      contributionCount: number;
      contributionLevel: string;
      color: string;
      weekday: number;
    }[];
  }[];
};

function getLevel(count: number) {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 9) return 3;
  return 4;
}

function getLocalDateString(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getDateRange() {
  const end = new Date();
  end.setHours(0, 0, 0, 0);

  const start = new Date(end);
  start.setDate(start.getDate() - 364);
  start.setDate(start.getDate() - start.getDay()); // Always align to Sunday

  return { start, end };
}

function formatGitHubDate(dateStr: string) {
  return new Date(`${dateStr}T00:00:00`).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

function getTooltipText(count: number, dateStr: string) {
  const formattedDate = formatGitHubDate(dateStr);
  if (count === 0) {
    return `No contributions on ${formattedDate}`;
  }
  return `${count} contribution${count === 1 ? '' : 's'} on ${formattedDate}`;
}

export default function Github() {
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [total, setTotal] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const todayStr = useMemo(() => {
    return getLocalDateString(new Date());
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchContributions() {
      try {
        setIsLoading(true);
        setHasError(false);

        const response = await fetch('/api/github/contributions', {
          signal: controller.signal,
          headers: {
            Accept: 'application/json',
          },
          cache: 'no-store',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch GitHub contributions');
        }

        const data: ContributionResponse = await response.json();

        const contributionDays = data.weeks.flatMap(
          (week) => week.contributionDays,
        );

        const formattedContributions: Contribution[] = contributionDays.map(
          (day) => ({
            date: day.date,
            count: day.contributionCount,
            level: getLevel(day.contributionCount),
          }),
        );

        setContributions(formattedContributions);
        setTotal(data.totalContributions);
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }

        console.error('GitHub contributions error:', error);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchContributions();

    const handleFocus = () => {
      fetchContributions();
    };
    window.addEventListener('focus', handleFocus);
    const interval = setInterval(fetchContributions, 60000);

    return () => {
      controller.abort();
      window.removeEventListener('focus', handleFocus);
      clearInterval(interval);
    };
  }, []);

  // Auto scroll to the right edge (latest month) when graph finishes loading
  useEffect(() => {
    if (!isLoading && !hasError && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      requestAnimationFrame(() => {
        container.scrollLeft = container.scrollWidth;
      });
    }
  }, [isLoading, hasError]);

  const contributionMap = useMemo(() => {
    const map = new Map<string, Contribution>();

    contributions.forEach((item) => {
      map.set(item.date, {
        ...item,
        level: getLevel(item.count),
      });
    });

    return map;
  }, [contributions]);

  const weeks = useMemo(() => {
    const { start, end } = getDateRange();

    const result: Contribution[][] = [];
    const current = new Date(start);

    while (current <= end) {
      const week: Contribution[] = [];

      for (let day = 0; day < 7; day++) {
        const date = new Date(current);

        const isoDate = getLocalDateString(date);

        const existing = contributionMap.get(isoDate);

        week.push(
          existing ?? {
            date: isoDate,
            count: 0,
            level: 0,
          },
        );

        current.setDate(current.getDate() + 1);
      }

      result.push(week);
    }

    return result;
  }, [contributionMap]);

  const monthLabels = useMemo(() => {
    const rawLabels: {
      label: string;
      column: number;
    }[] = [];

    let lastMonth = -1;

    weeks.forEach((week, index) => {
      const firstDay = new Date(`${week[0].date}T00:00:00`);
      const month = firstDay.getMonth();

      if (month !== lastMonth) {
        rawLabels.push({
          label: githubConfig.months[month],
          column: index,
        });

        lastMonth = month;
      }
    });

    const filteredLabels: { label: string; column: number }[] = [];

    for (let i = 0; i < rawLabels.length; i++) {
      const current = rawLabels[i];
      const next = rawLabels[i + 1];

      // Skip label if it's too close to the next month label
      if (next && next.column - current.column < 2) {
        continue;
      }

      // Skip label if it's too close to the end of the year graph
      if (current.column >= weeks.length - 2) {
        continue;
      }

      filteredLabels.push(current);
    }

    return filteredLabels;
  }, [weeks]);

  const colors = githubConfig.theme.dark;

  return (
    <Container className="mt-20">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-foreground text-2xl font-bold">
              {githubConfig.title}
            </h2>

            <p className="text-muted-foreground text-sm">
              <b>{githubConfig.username}</b>&apos;s {githubConfig.subtitle}
            </p>
          </div>

          <Link
            href={`https://github.com/${githubConfig.username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground hidden items-center gap-2 text-sm transition sm:flex"
          >
            <GithubIcon className="h-4 w-4" />
            GitHub
          </Link>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="border-border bg-background rounded-xl border p-8">
            <div className="flex flex-col items-center justify-center gap-3">
              <div className="border-muted-foreground/30 border-t-foreground h-6 w-6 animate-spin rounded-full border-2" />

              <p className="text-foreground font-medium">
                {githubConfig.loadingState.title}
              </p>

              <p className="text-muted-foreground text-sm">
                {githubConfig.loadingState.description}
              </p>
            </div>
          </div>
        )}

        {/* Error */}
        {!isLoading && hasError && (
          <div className="text-muted-foreground border-border rounded-xl border-2 border-dashed p-8 text-center">
            <div className="bg-muted mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
              <GithubIcon className="h-8 w-8" />
            </div>

            <p className="text-foreground mb-2 font-medium">
              {githubConfig.errorState.title}
            </p>

            <p className="mb-4 text-sm">
              {githubConfig.errorState.description}
            </p>

            <Button variant="outline" asChild>
              <Link
                href={`https://github.com/${githubConfig.username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
              >
                <GithubIcon className="h-4 w-4" />
                {githubConfig.errorState.buttonText}
              </Link>
            </Button>
          </div>
        )}

        {/* Contribution Graph */}
        {!isLoading && !hasError && (
          <div className="border-border bg-background rounded-xl border p-5">
            <div
              ref={scrollContainerRef}
              className="overflow-x-auto pb-2 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-muted-foreground/20 hover:[&::-webkit-scrollbar-thumb]:bg-muted-foreground/40"
            >
              <div className="min-w-[760px]">
                {/* Month labels */}
                <div className="mb-2 ml-9 grid grid-cols-[repeat(53,11px)] gap-[3px] text-xs h-4 relative">
                  {monthLabels.map((item) => (
                    <div
                      key={`${item.label}-${item.column}`}
                      className="text-muted-foreground whitespace-nowrap text-xs select-none"
                      style={{ gridColumnStart: item.column + 1 }}
                    >
                      {item.label}
                    </div>
                  ))}
                </div>

                <div className="flex items-start">
                  {/* Weekday labels */}
                  <div className="mr-2 grid grid-rows-7 gap-[3px] pt-0">
                    {githubConfig.weekdays.map((day, index) => (
                      <div
                        key={index}
                        className="text-muted-foreground flex h-[11px] w-7 items-center justify-end pr-1 text-[10px] leading-[11px] select-none"
                      >
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Contribution cells */}
                  <TooltipProvider delayDuration={0}>
                    <div className="flex gap-[3px]">
                      {weeks.map((week, weekIndex) => (
                        <div
                          key={weekIndex}
                          className="grid grid-rows-7 gap-[3px]"
                        >
                          {week.map((day) => {
                            const isFuture = day.date > todayStr;
                            if (isFuture) {
                              return (
                                <div
                                  key={day.date}
                                  className="h-[11px] w-[11px] opacity-0 pointer-events-none"
                                />
                              );
                            }
                            return (
                              <Tooltip key={day.date}>
                                <TooltipTrigger asChild>
                                  <div
                                    className="h-[11px] w-[11px] rounded-[2px] transition-transform hover:scale-125 hover:z-10 hover:ring-1 hover:ring-white/40 cursor-pointer"
                                    style={{
                                      backgroundColor:
                                        colors[day.level] || colors[0],
                                    }}
                                  />
                                </TooltipTrigger>
                                <TooltipContent
                                  side="top"
                                  className="border-border/50 bg-[#161b22] px-2.5 py-1 text-[11px] font-medium text-white shadow-xl"
                                >
                                  {getTooltipText(day.count, day.date)}
                                </TooltipContent>
                              </Tooltip>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  </TooltipProvider>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="text-muted-foreground mt-4 flex flex-col gap-3 text-xs sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <span>
                  {githubConfig.totalCountLabel.replace(
                    '{{count}}',
                    total.toLocaleString(),
                  )}
                </span>
                <Link
                  href="https://docs.github.com/articles/why-are-my-contributions-not-showing-on-my-profile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground hidden sm:inline hover:underline transition-colors text-[11px]"
                >
                  Learn how we count contributions
                </Link>
              </div>

              <div className="flex items-center gap-2">
                <span>Less</span>

                <div className="flex gap-1">
                  {colors.map((color, index) => (
                    <div
                      key={index}
                      className="h-[11px] w-[11px] rounded-[2px]"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>

                <span>More</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
}