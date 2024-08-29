import { getNowPlaying } from "@/app/utils/spotify";
import { NextResponse } from "next/server";

interface SpotifyData {
  album: string;
  albumImageUrl: string;
  artist: string;
  isPlaying: boolean;
  songUrl: string;
  title: string;
}

let cachedData: SpotifyData | null = null;
let cacheTime: number = 0;
const CACHE_DURATION = 30 * 1000; // 30 seconds

export async function GET() {
  const currentTime = Date.now();
  if (cachedData && currentTime - cacheTime < CACHE_DURATION) {
    return NextResponse.json(cachedData);
  }

  try {
    const response = await getNowPlaying();

    if (response.status === 204 || response.status > 400) {
      return NextResponse.json({ isPlaying: false });
    }

    const song = await response.json();

    if (song.item === null) {
      return NextResponse.json({ isPlaying: false });
    }

    cachedData = {
      album: song.item.album.name,
      albumImageUrl: song.item.album.images[0].url,
      artist: song.item.artists.map((_artist: any) => _artist.name).join(", "),
      isPlaying: song.is_playing,
      songUrl: song.item.external_urls.spotify,
      title: song.item.name,
    };
    cacheTime = currentTime;

    return NextResponse.json(cachedData);
  } catch (error) {
    console.error("Error fetching now playing:", error);
    return NextResponse.json(
      { isPlaying: false, error: "Failed to fetch now playing data" },
      { status: 500 }
    );
  }
}
