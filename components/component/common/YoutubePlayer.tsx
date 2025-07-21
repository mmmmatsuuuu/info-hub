/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useEffect, useRef} from "react";
import { getYoutubeId } from "@lib/regax";
import { Content } from "@/types/dbOperation";

export const YouTubePlayer = ({
  content,
  onPlayThresholdReached
}: {
  content: Content;
  onPlayThresholdReached?: (videoId: string) => void;
}) => {
  const playerRef = useRef<any>(null);
  const videoId = getYoutubeId(content.url) || "";
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const hasCountedRef = useRef<boolean>(false);
  const accumulatedTimeRef = useRef<number>(0); // 総再生時間
  const lastCheckedTimeRef = useRef<number>(0); // 前回チェック時の再生時間

  useEffect(() => {
    if (typeof window === "undefined") return;

    // videoIdが変わったら状態をリセット
    accumulatedTimeRef.current = 0;
    lastCheckedTimeRef.current = 0;
    hasCountedRef.current = false;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // YouTube API スクリプトを一度だけ読み込む
    if (!(window as any).YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    }

    const createPlayer = () => {
      if (!playerRef.current) {
        playerRef.current = new (window as any).YT.Player(`youtube-player-${videoId}`, {
          videoId,
          events: {
            onStateChange: (event: any) => {
              if (event.data === (window as any).YT.PlayerState.PLAYING) {
                // 動画が再生されたらインターバルを開始
                if (!hasCountedRef.current && onPlayThresholdReached) {
                  // 再生開始時の時間を記録
                  lastCheckedTimeRef.current = playerRef.current.getCurrentTime();

                  intervalRef.current = setInterval(() => {
                    const currentTime = playerRef.current?.getCurrentTime();
                    if (currentTime === undefined) return; // プレイヤーが準備できていない場合

                    const elapsed = currentTime - lastCheckedTimeRef.current;
                    accumulatedTimeRef.current += elapsed;
                    lastCheckedTimeRef.current = currentTime;

                    if (accumulatedTimeRef.current >= 120) {
                      onPlayThresholdReached(content.contentId);
                      hasCountedRef.current = true;
                      if (intervalRef.current) {
                        clearInterval(intervalRef.current);
                      }
                    }
                  }, 1000); // 1秒ごとにチェック
                }
              } else if (event.data === (window as any).YT.PlayerState.PAUSED ||
                         event.data === (window as any).YT.PlayerState.ENDED ||
                         event.data === (window as any).YT.PlayerState.BUFFERING) {
                // 再生が停止したらインターバルをクリアし、最終再生時間を記録
                if (intervalRef.current) {
                  console.log("Clearing interval.");
                  clearInterval(intervalRef.current);
                  intervalRef.current = null;
                }
                if (playerRef.current) {
                  lastCheckedTimeRef.current = playerRef.current.getCurrentTime();
                }
              }
            },
          },
        });
      }
    };

    if ((window as any).YT && (window as any).YT.Player) {
      createPlayer();
    } else {
      (window as any).onYouTubeIframeAPIReady = createPlayer;
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      // コンポーネントがアンマウントされたらリセット（videoId変更時にもリセットされるため冗長だが安全のため）
      hasCountedRef.current = false;
      accumulatedTimeRef.current = 0;
      lastCheckedTimeRef.current = 0;
    };
  }, [videoId, onPlayThresholdReached]);

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