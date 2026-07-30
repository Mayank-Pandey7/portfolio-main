import { NextResponse } from 'next/server';

const GITHUB_API = 'https://api.github.com/graphql';

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

export async function GET() {
  try {
    const token = process.env.GITHUB_TOKEN;

    if (!token) {
      return NextResponse.json(
        { error: 'GITHUB_TOKEN is not configured' },
        { status: 500 },
      );
    }

    const response = await fetch(GITHUB_API, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: {
          login: 'Mayank-Pandey7',
        },
      }),
    });

    const result = await response.json();

    if (!response.ok || result.errors) {
      console.error('GitHub GraphQL error:', result);

      return NextResponse.json(
        {
          error: 'GitHub API request failed',
          details: result.errors ?? null,
        },
        { status: 500 },
      );
    }

    const calendar =
      result.data?.user?.contributionsCollection?.contributionCalendar;

    if (!calendar) {
      return NextResponse.json(
        { error: 'Contribution calendar not found' },
        { status: 404 },
      );
    }

    return NextResponse.json({
      username: 'Mayank-Pandey7',
      totalContributions: calendar.totalContributions,
      colors: calendar.colors,
      weeks: calendar.weeks,
    });
  } catch (error) {
    console.error('GitHub API error:', error);

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}