"use client";

import { useEffect, useState } from "react";
import { FaSpotify } from "react-icons/fa6";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface SpotifyData {
  albumImageUrl: string;
  artist: string;
  isPlaying: boolean;
  songUrl: string;
  title: string;
}

const variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const SpotifyNowPlaying: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<SpotifyData>({
    albumImageUrl: "",
    artist: "No Artist",
    isPlaying: false,
    songUrl: "",
    title: "No Title",
  });

  const fetchNowPlaying = async () => {
    try {
      const response = await fetch("/api/now-playing", { cache: "no-store" });
      if (!response.ok) {
        throw new Error("Failed to fetch now playing data");
      }
      const data: SpotifyData = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching now playing item:", error);
      return null;
    }
  };

  useEffect(() => {
    const updateNowPlaying = async () => {
      setLoading(true);
      const data = await fetchNowPlaying();
      if (data) {
        setResult(data);
      }
      setLoading(false);
    };

    updateNowPlaying();

    const pollingInterval = setInterval(updateNowPlaying, 30000);

    return () => {
      clearInterval(pollingInterval);
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <motion.div
          key="loading"
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="flex items-center gap-2 text-sm"
        >
          <div className="flex h-[45px] w-[45px] items-center justify-center rounded-md bg-[#1CB955] text-black">
            <FaSpotify className="text-2xl" />
          </div>
          <p className="text-xs">
            <span className="font-medium text-neutral-500">Hold up</span>
            <br />
            Checking Spotify...
          </p>
        </motion.div>
      ) : result.isPlaying ? (
        <motion.a
          key={result.songUrl}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          href={result.songUrl}
          rel="noopener noreferrer"
          target="_blank"
          className="flex items-center gap-2"
        >
          <Image
            src={result.albumImageUrl || "/path/to/fallback-image.png"}
            alt="Album Art"
            width={45}
            height={45}
            className="rounded-md"
          />
          <div className="flex flex-col">
            <span className="text-xs font-medium text-neutral-200">
              {result.title}
            </span>
            <span className="text-xs text-neutral-500">{result.artist}</span>
          </div>
        </motion.a>
      ) : (
        <motion.a
          key="not-playing"
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          href="https://open.spotify.com/user/0xeuqnft898ntgqarzodkaszw"
          rel="noopener noreferrer"
          target="_blank"
          className="flex items-center gap-2 text-sm"
        >
          <div className="flex h-[45px] w-[45px] items-center justify-center rounded-md bg-[#1CB955] text-black">
            <FaSpotify className="text-2xl" />
          </div>
          <p className="text-xs">
            <span className="font-medium">Not playing</span>
            <br />
            Click to view my profile.
          </p>
        </motion.a>
      )}
    </AnimatePresence>
  );
};

export default SpotifyNowPlaying;
