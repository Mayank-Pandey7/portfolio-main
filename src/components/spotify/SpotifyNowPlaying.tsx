'use client';

import SpotifyIcon from '@/components/svgs/Spotify';
import { spotifyConfig } from '@/config/Hero';
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
  title: spotifyConfig.song,
  artist: spotifyConfig.artist,
  songUrl: spotifyConfig.href,
  status: spotifyConfig.status,
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
    <div className="mt-3.5 sm:mt-4 max-w-full overflow-hidden">
      <div className="flex w-full min-w-0 items-center gap-1.5 text-xs sm:text-sm whitespace-nowrap">
        <div className="relative flex items-center justify-center shrink-0">
          <SpotifyIcon className="size-4 sm:size-4.5 text-[#1DB954]" />
          {data.isPlaying && (
            <span className="absolute -top-0.5 -right-0.5 flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1DB954] opacity-75"></span>
              <span className="relative inline-flex size-2 rounded-full bg-[#1DB954]"></span>
            </span>
          )}
        </div>

        <span className="shrink-0 font-semibold text-foreground/90 select-none">
          {data.isPlaying ? 'Currently playing' : 'Last played'}
        </span>
        <span className="shrink-0 text-neutral-400 select-none">—</span>

        <a
          href={data.songUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="min-w-0 flex-1 truncate text-neutral-400 transition-colors hover:text-foreground hover:underline"
        >
          {data.title} · {data.artist}
        </a>
      </div>
    </div>
  );
}
