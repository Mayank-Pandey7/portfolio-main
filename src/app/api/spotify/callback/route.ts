import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json(
      { error: 'No authorization code returned from Spotify' },
      { status: 400 },
    );
  }

  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
  const redirect_uri =
    process.env.SPOTIFY_REDIRECT_URI ||
    'https://portfolio-mayank-dev.vercel.app/api/spotify/callback';

  if (!client_id || !client_secret) {
    return NextResponse.json(
      {
        error:
          'SPOTIFY_CLIENT_ID or SPOTIFY_CLIENT_SECRET is missing in environment variables',
      },
      { status: 400 },
    );
  }

  const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri,
      }),
    });

    const data = await response.json();

    if (data.error) {
      return NextResponse.json({ error: data }, { status: 400 });
    }

    const refreshToken = data.refresh_token;

    const htmlResponse = `
      <!質html>
      <html>
        <head>
          <title>Spotify Refresh Token Generated</title>
          <style>
            body { font-family: system-ui, sans-serif; background: #09090b; color: #f4f4f5; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; padding: 20px; }
            .card { background: #18181b; border: 1px solid #27272a; padding: 32px; border-radius: 12px; max-width: 600px; width: 100%; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
            h1 { color: #1DB954; font-size: 24px; margin-top: 0; }
            p { font-size: 14px; color: #a1a1aa; line-height: 1.6; }
            textarea { width: 100%; height: 80px; background: #09090b; border: 1px solid #3f3f46; color: #22c55e; padding: 12px; font-family: monospace; font-size: 13px; border-radius: 6px; box-sizing: border-box; resize: none; margin: 16px 0; }
            .btn { background: #1DB954; color: #000; font-weight: bold; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; font-size: 14px; }
            .btn:hover { background: #1ed760; }
          </style>
        </head>
        <body>
          <div class="card">
            <h1>Spotify Token Generated Successfully!</h1>
            <p>Copy your <strong>SPOTIFY_REFRESH_TOKEN</strong> below and paste it into your <code>.env.local</code> file (or Vercel Environment Variables):</p>
            <textarea readonly id="token">${refreshToken}</textarea>
            <button className="btn" onclick="navigator.clipboard.writeText(document.getElementById('token').value); alert('Copied to clipboard!');">Copy Refresh Token</button>
            <p style="margin-top: 24px;"><a href="/" style="color: #a1a1aa;">← Back to Home Page</a></p>
          </div>
        </body>
      </html>
    `;

    return new NextResponse(htmlResponse, {
      headers: { 'Content-Type': 'text/html' },
    });
  } catch (error) {
    console.error('Error getting Spotify refresh token:', error);
    return NextResponse.json({ error: 'Failed to generate refresh token' }, { status: 500 });
  }
}
