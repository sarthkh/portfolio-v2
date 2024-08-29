import { NextResponse } from "next/server";
import { getNowPlaying } from "../../utils/spotify";

export const revalidate = 60; // cache for 1 min

export async function GET() {
  try {
    const response = await getNowPlaying();

    if (response.status === 204 || response.status > 400) {
      return NextResponse.json({ isPlaying: false });
    }

    const song = await response.json();

    if (song.item === null) {
      return NextResponse.json({ isPlaying: false });
    }

    const { is_playing, item } = song;
    const { name: title, artists, album, external_urls } = item;

    return NextResponse.json({
      isPlaying: is_playing,
      title,
      artist: artists.map((artist: { name: string }) => artist.name).join(", "),
      album: album.name,
      albumImageUrl: album.images[0]?.url,
      songUrl: external_urls.spotify,
    });
  } catch (error) {
    console.error("Error fetching now playing:", error);
    return NextResponse.json(
      { isPlaying: false, error: "Failed to fetch now playing data" },
      { status: 500 }
    );
  }
}
