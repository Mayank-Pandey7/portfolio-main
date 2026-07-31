import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const GITHUB_API = 'https://api.github.com/graphql';
const USERNAME = 'Mayank-Pandey7';

const query = `
  query($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          colors
          weeks {
            firstDay
            contributionDays {
              date
              contributionCount
              contributionLevel
              color
              weekday
            }
          }
        }
      }
    }
  }
`;

async function fetchFallback() {
  const res = await fetch(
    `https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`,
    {
      cache: 'no-store',
    },
  );
  if (!res.ok) {
    throw new Error(`Fallback API failed with status ${res.status}`);
  }
  const data = await res.json();
  const days: { date: string; count: number; level: number }[] =
    data.contributions || [];

  const today = new Date();
  const yearAgo = new Date(today);
  yearAgo.setDate(yearAgo.getDate() - 365);
  const yearAgoStr = yearAgo.toISOString().split('T')[0];

  const recentDays = days.filter((d) => d.date >= yearAgoStr);
  const totalContributions = recentDays.reduce((acc, d) => acc + d.count, 0);

  const weeksMap = new Map<
  string,
  {
    date: string;
    contributionCount: number;
    contributionLevel: string;
    color: string;
    weekday: number;
  }[]
>();
  recentDays.forEach((day) => {
    const d = new Date(`${day.date}T00:00:00`);
    const sunday = new Date(d);
    sunday.setDate(sunday.getDate() - sunday.getDay());
    const weekKey = sunday.toISOString().split('T')[0];

    if (!weeksMap.has(weekKey)) {
      weeksMap.set(weekKey, []);
    }
    weeksMap.get(weekKey)!.push({
      date: day.date,
      contributionCount: day.count,
      contributionLevel: `LEVEL_${day.level}`,
      color: '#0e4429',
      weekday: d.getDay(),
    });
  });

  const weeks = Array.from(weeksMap.entries()).map(
    ([firstDay, contributionDays]) => ({
      firstDay,
      contributionDays,
    }),
  );

  return {
    username: USERNAME,
    totalContributions,
    colors: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
    weeks,
  };
}

export async function GET() {
  try {
    const token = process.env.GITHUB_TOKEN;

    if (token) {
      const response = await fetch(GITHUB_API, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          variables: {
            login: USERNAME,
          },
        }),
        cache: 'no-store',
      });

      const result = await response.json();

      if (response.ok && !result.errors) {
        const calendar =
          result.data?.user?.contributionsCollection?.contributionCalendar;
        if (calendar) {
          return NextResponse.json({
            username: USERNAME,
            totalContributions: calendar.totalContributions,
            colors: calendar.colors,
            weeks: calendar.weeks,
          });
        }
      }
    }

    // Fallback to public contributions API if token is absent, invalid, or API fails
    const fallbackData = await fetchFallback();
    return NextResponse.json(fallbackData);
  } catch (error) {
    console.error('GitHub API error, attempting fallback:', error);
    try {
      const fallbackData = await fetchFallback();
      return NextResponse.json(fallbackData);
    } catch (fallbackError) {
      console.error('GitHub fallback error:', fallbackError);
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 },
      );
    }
  }
}