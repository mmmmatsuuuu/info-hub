/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useEffect, useRef} from "react";
import { getYoutubeId } from "@lib/regax";

export const YouTubePlayer = ({ 
  url 
}: { 
  url: string 
}) => {
  const playerRef = useRef<any>(null);
  const videoId = getYoutubeId(url);

  useEffect(() => {
    // YouTube API スクリプトを一度だけ読み込む
    if (typeof window !== "undefined" && !(window as any).YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    }

    // YouTube API がロード済みならすぐにプレーヤーを作成
    const createPlayer = () => {
      if (!playerRef.current) {
        playerRef.current = new (window as any).YT.Player(`youtube-player-${videoId}`, {
          videoId,
          events: {
            onStateChange: (event: any) => {
              if (event.data === 1) {
                console.log("動画が再生されました");
              }
            },
          },
        });
      }
    };

    if ((window as any).YT) {
      createPlayer();
    } else {
      (window as any).onYouTubeIframeAPIReady = createPlayer;
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [videoId]);

  return (
    <div className="w-full">
      <div className="relative w-full aspect-video">
        <div
          id={`youtube-player-${videoId}`}
          className="absolute inset-0 w-full h-full"
        ></div>
      </div>
    </div>
  );
};