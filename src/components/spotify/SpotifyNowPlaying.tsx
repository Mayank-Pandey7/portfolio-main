'use client';

import SpotifyIcon from '@/components/svgs/Spotify';
import React, { useEffect, useState } from 'react';

interface SpotifyData {
  isPlaying: boolean;
  title: string;
  artist: string;
  album?: string;
  albumImageUrl?: string;
  songUrl: string;
  status: string;
}

const fallbackData: SpotifyData = {
  isPlaying: false,
  title: 'São Paulo (feat. Anitta)',
  artist: 'The Weeknd, Anitta',
  songUrl: 'https://open.spotify.com/search/S%C3%A3o%20Paulo%20The%20Weeknd',
  status: 'Last played',
};

export default function SpotifyNowPlaying() {
  const [data, setData] = useState<SpotifyData>(fallbackData);

  useEffect(() => {
    let isMounted = true;

    const fetchNowPlaying = async () => {
      try {
        const res = await fetch('/api/spotify/now-playing');
        if (res.ok) {
          const json = await res.json();
          if (isMounted && json && json.title) {
            setData(json);
          }
        }
      } catch (err) {
        console.error('Failed to fetch Spotify track:', err);
      }
    };

    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, 5000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="mt-3.5 sm:mt-4">
      <div className="inline-flex flex-wrap items-center gap-1.5 text-xs sm:text-sm">
        <div className="relative flex items-center justify-center shrink-0">
          <SpotifyIcon className="size-4 sm:size-4.5 text-[#1DB954]" />
          {data.isPlaying && (
            <span className="absolute -top-0.5 -right-0.5 flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1DB954] opacity-75"></span>
              <span className="relative inline-flex size-2 rounded-full bg-[#1DB954]"></span>
            </span>
          )}
        </div>

        <span className="text-secondary font-normal select-none">
          {data.isPlaying ? 'Currently playing' : 'Last played'}
        </span>
        <span className="text-neutral-400 select-none">—</span>

        <a
          href={data.songUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-neutral-400 hover:text-foreground transition-colors truncate max-w-[280px] sm:max-w-[420px] hover:underline"
        >
          {data.title} · {data.artist}
        </a>
      </div>
    </div>
  );
}
