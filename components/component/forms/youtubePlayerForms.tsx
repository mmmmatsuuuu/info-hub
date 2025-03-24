/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useEffect, useRef, useState } from "react";
import { getYoutubeId } from "@lib/regax";
import { Progress } from "@/types/dbOperation";
import { incrementViewCountAction } from "@lib/actions/progressAction";

export const YouTubePlayerForms = ({ 
  url,
  progress
}: { 
  url: string,
  progress: Progress,
}) => {
  const playerRef = useRef<any>(null);
  const videoId = getYoutubeId(url);
  const [ watchedTime, setWatchedTime ] = useState(0);
  const [ hadCounted, setHasCounted ] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // すでに API スクリプトが読み込まれている場合は追加しない
    if (typeof window !== "undefined" && !(window as any).YT) {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      document.body.appendChild(script);
    }

    const createPlayer = () => {
      if (!playerRef.current) {
        playerRef.current = new (window as any).YT.Player(`youtube-player-${videoId}`, {
          videoId,
          events: {
            onStateChange: (event: any) => {
              handleStateChenge(event);
            }
          },
        });
      }
    };

    // YouTube API がロード済みならすぐにプレーヤーを作成
    if ((window as any).YT) {
      createPlayer();
    } else {
      (window as any).onYouTubeIframeAPIReady = createPlayer;
    }

    return () => {
      // アンマウント時にプレーヤーを破棄
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }

      // インターバルをクリア
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [videoId]);

  const handleStateChenge = (event: any) => {
    if (event.data === 1) { // 動画が再生された
      console.log("動画が再生されました");

      // 1秒ごとに再生時間を記録
      intervalRef.current = setInterval(() => {
        if (playerRef.current) {
          setWatchedTime(prev => prev + 1);
        }
      }, 1000);
    } else {
      // 再生が停止・終了したらカウントを止める
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  }

  // 30秒以上視聴したら視聴回数を１増やす
  useEffect(() => {
    if (watchedTime >= 30 && hadCounted == false) {
      incrementViewCountAction(progress);
      setHasCounted(true);
    }
  }, [watchedTime]);

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