import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const redirect_uri =
    process.env.SPOTIFY_REDIRECT_URI ||
    'https://portfolio-mayank-dev.vercel.app/api/spotify/callback';

  if (!client_id) {
    return NextResponse.json(
      { error: 'SPOTIFY_CLIENT_ID is missing in environment variables' },
      { status: 400 },
    );
  }

  const scope =
    'user-read-currently-playing user-read-recently-played user-read-playback-state';

  const params = new URLSearchParams({
    response_type: 'code',
    client_id,
    scope,
    redirect_uri,
  });

  return NextResponse.redirect(
    `https://accounts.spotify.com/authorize?${params.toString()}`,
  );
}
