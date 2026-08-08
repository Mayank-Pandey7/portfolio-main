import fs from 'fs';
import http from 'http';
import path from 'path';
import { exec } from 'child_process';

const envPath = path.join(process.cwd(), '.env.local');
let envContent = '';

if (fs.existsSync(envPath)) {
  envContent = fs.readFileSync(envPath, 'utf8');
}

const getEnvVal = (key) => {
  const match = envContent.match(new RegExp(`^${key}=(.*)$`, 'm'));
  return match ? match[1].trim() : process.env[key];
};

const client_id = getEnvVal('SPOTIFY_CLIENT_ID');
const client_secret = getEnvVal('SPOTIFY_CLIENT_SECRET');
const redirect_uri = process.env.SPOTIFY_REDIRECT_URI || 'https://portfolio-mayank-dev.vercel.app/api/spotify/callback';

if (!client_id || !client_secret || client_id === 'your_client_id') {
  console.error('\n❌ Error: Please ensure SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET are set in your .env.local file.\n');
  process.exit(1);
}

const scope = 'user-read-currently-playing user-read-recently-played user-read-playback-state';
const authUrl = `https://accounts.spotify.com/authorize?${new URLSearchParams({
  response_type: 'code',
  client_id,
  scope,
  redirect_uri,
}).toString()}`;

const server = http.createServer(async (req, res) => {
  const reqUrl = new URL(req.url, redirect_uri);
  
  if (reqUrl.pathname === '/api/spotify/callback' || reqUrl.pathname === '/callback') {
    const code = reqUrl.searchParams.get('code');
    
    if (code) {
      try {
        const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
        const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
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

        const tokenData = await tokenRes.json();
        
        if (tokenData.refresh_token) {
          const refreshToken = tokenData.refresh_token;
          
          // Update or append SPOTIFY_REFRESH_TOKEN in .env.local
          if (envContent.includes('SPOTIFY_REFRESH_TOKEN=')) {
            envContent = envContent.replace(/^SPOTIFY_REFRESH_TOKEN=.*$/m, `SPOTIFY_REFRESH_TOKEN=${refreshToken}`);
          } else {
            envContent += `\nSPOTIFY_REFRESH_TOKEN=${refreshToken}\n`;
          }
          
          fs.writeFileSync(envPath, envContent, 'utf8');

          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(`
            <div style="font-family: system-ui; background: #09090b; color: #fff; padding: 40px; text-align: center; min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center;">
              <h1 style="color: #1DB954; font-size: 32px;">🎉 Spotify Connected Successfully!</h1>
              <p style="font-size: 18px; color: #a1a1aa;">Your <strong>SPOTIFY_REFRESH_TOKEN</strong> has been automatically saved to your <code>.env.local</code> file!</p>
              <div style="background: #18181b; border: 1px solid #27272a; padding: 20px; border-radius: 8px; font-family: monospace; color: #22c55e; max-width: 600px; word-break: break-all; margin: 20px 0;">
                SPOTIFY_REFRESH_TOKEN=${refreshToken}
              </div>
              <p style="color: #71717a;">Please restart your Next.js dev server to activate live Spotify status!</p>
            </div>
          `);

          console.log('\n✅ SUCCESS! Your SPOTIFY_REFRESH_TOKEN has been automatically written to .env.local!\n');
          setTimeout(() => process.exit(0), 2000);
          return;
        } else {
          res.writeHead(400, { 'Content-Type': 'text/plain' });
          res.end('Failed to retrieve refresh token from Spotify: ' + JSON.stringify(tokenData));
        }
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error retrieving token: ' + err.message);
      }
    }
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not found');
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log('⚠️ Port 3000 is occupied by Next.js dev server. Listening on port 8888 instead...');
    server.listen(8888);
  } else {
    console.error('Server error:', err);
  }
});

const targetPort = new URL(redirect_uri).port ? parseInt(new URL(redirect_uri).port) : 8888;

server.listen(targetPort, () => {
  console.log('\n🎵 Opening Spotify Authorization in your browser...');
  console.log(`URL: ${authUrl}\n`);
  
  const startCmd = process.platform === 'win32' ? 'start' : process.platform === 'darwin' ? 'open' : 'xdg-open';
  exec(`${startCmd} "${authUrl}"`);
});
