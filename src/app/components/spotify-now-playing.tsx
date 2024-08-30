"use client";

import React, { useState, useEffect } from "react";
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
  const [data, setData] = useState<SpotifyData | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/now-playing");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setData(result);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("An error occurred"));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000); // poll every 60 sec

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <LoadingComponent />
      ) : error ? (
        <ErrorComponent />
      ) : data?.isPlaying ? (
        <NowPlayingComponent data={data} />
      ) : (
        <NotPlayingComponent />
      )}
    </AnimatePresence>
  );
};

const LoadingComponent = () => (
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
);

const ErrorComponent = () => (
  <motion.div
    key="error"
    variants={variants}
    initial="initial"
    animate="animate"
    exit="exit"
    className="flex items-center gap-2 text-sm"
  >
    <div className="flex h-[45px] w-[45px] items-center justify-center rounded-md bg-red-500 text-white">
      <FaSpotify className="text-2xl" />
    </div>
    <p className="text-xs">
      <span className="font-medium text-neutral-500">Error</span>
      <br />
      Failed to fetch Spotify data
    </p>
  </motion.div>
);

const NowPlayingComponent: React.FC<{ data: SpotifyData }> = ({ data }) => (
  <motion.a
    key={data.songUrl}
    variants={variants}
    initial="initial"
    animate="animate"
    exit="exit"
    href={data.songUrl}
    rel="noopener noreferrer"
    target="_blank"
    className="flex items-center gap-2"
  >
    <Image
      src={data.albumImageUrl || "/path/to/fallback-image.png"}
      alt="Album Art"
      width={45}
      height={45}
      className="rounded-md"
    />
    <div className="flex flex-col">
      <span className="text-xs font-medium text-neutral-200">{data.title}</span>
      <span className="text-xs text-neutral-500">{data.artist}</span>
    </div>
  </motion.a>
);

const NotPlayingComponent = () => (
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
);

export default SpotifyNowPlaying;
