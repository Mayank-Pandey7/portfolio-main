import { getNowPlaying, getRecentlyPlayed } from '@/lib/spotify';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const nowPlayingData = await getNowPlaying();

    if (nowPlayingData && nowPlayingData.is_playing && nowPlayingData.item) {
      const track = nowPlayingData.item;
      const title = track.name;
      const artist = track.artists
        .map((a: { name: string }) => a.name)
        .join(', ');
      const album = track.album.name;
      const albumImageUrl = track.album.images[0]?.url ?? '';
      const songUrl = track.external_urls.spotify;

      return NextResponse.json({
        isPlaying: true,
        title,
        artist,
        album,
        albumImageUrl,
        songUrl,
        status: 'Currently playing',
      });
    }

    // Fallback to recently played
    const recentlyPlayedData = await getRecentlyPlayed();

    if (
      recentlyPlayedData &&
      recentlyPlayedData.items &&
      recentlyPlayedData.items.length > 0
    ) {
      const track = recentlyPlayedData.items[0].track;
      const title = track.name;
      const artist = track.artists
        .map((a: { name: string }) => a.name)
        .join(', ');
      const album = track.album.name;
      const albumImageUrl = track.album.images[0]?.url ?? '';
      const songUrl = track.external_urls.spotify;

      return NextResponse.json({
        isPlaying: false,
        title,
        artist,
        album,
        albumImageUrl,
        songUrl,
        status: 'Last played',
      });
    }

    return NextResponse.json({
      isPlaying: false,
      title: 'São Paulo (feat. Anitta)',
      artist: 'The Weeknd, Anitta',
      album: 'São Paulo',
      albumImageUrl: '',
      songUrl: 'https://open.spotify.com/search/S%C3%A3o%20Paulo%20The%20Weeknd',
      status: 'Last played',
    });
  } catch (error) {
    console.error('Spotify API Route Error:', error);
    return NextResponse.json({
      isPlaying: false,
      title: 'São Paulo (feat. Anitta)',
      artist: 'The Weeknd, Anitta',
      album: 'São Paulo',
      albumImageUrl: '',
      songUrl: 'https://open.spotify.com/search/S%C3%A3o%20Paulo%20The%20Weeknd',
      status: 'Last played',
    });
  }
}
