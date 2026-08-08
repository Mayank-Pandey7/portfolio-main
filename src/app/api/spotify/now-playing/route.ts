import { spotifyConfig } from '@/config/Hero';
import { getNowPlaying, getRecentlyPlayed } from '@/lib/spotify';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const nowPlayingData = await getNowPlaying();

    if (nowPlayingData && nowPlayingData.item) {
      const track = nowPlayingData.item;
      const title = track.name;
      const artist = track.artists
        .map((a: { name: string }) => a.name)
        .join(', ');
      const album = track.album.name;
      const albumImageUrl = track.album.images[0]?.url ?? '';
      const songUrl = track.external_urls.spotify;
      const isPlaying = Boolean(nowPlayingData.is_playing);

      return NextResponse.json({
        isPlaying,
        title,
        artist,
        album,
        albumImageUrl,
        songUrl,
        status: isPlaying ? 'Currently playing' : 'Last played',
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
      title: spotifyConfig.song,
      artist: spotifyConfig.artist,
      album: spotifyConfig.song,
      albumImageUrl: '',
      songUrl: spotifyConfig.href,
      status: 'Last played',
    });
  } catch (error) {
    console.error('Spotify API Route Error:', error);
    return NextResponse.json({
      isPlaying: false,
      title: spotifyConfig.song,
      artist: spotifyConfig.artist,
      album: spotifyConfig.song,
      albumImageUrl: '',
      songUrl: spotifyConfig.href,
      status: 'Last played',
    });
  }
}
