'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs';
import { Content } from '@/types/dbOperation';
import { NotFound } from '@components/ui/notFound';
import { YouTubePlayer } from './YoutubePlayer';
import { useUserActivityStore } from '@/hooks/useUserActivityStore';
import { Badge } from "@/components/ui/badge";
import { useState, useCallback } from 'react';

export function Movie({
  contents
}: {
  contents: Content[],
}) {
  const { incrementPlayCount, contentActivity } = useUserActivityStore();
  const handlePlayThresholdReached = useCallback((videoId: string) => {
    console.log("Play threshold reached for video:", videoId);
    incrementPlayCount(videoId);
  }, [incrementPlayCount]);

  const [activeTab, setActiveTab] = useState(contents[0]?.contentId || '');

  

  if (contents.length == 0) {
    return (
      <NotFound text="このレッスンで使用する動画はありません。" />
    );
  }

  return (
    <Tabs
      defaultValue={ contents[0].contentId }
      value={activeTab}
      onValueChange={setActiveTab}
    >
      <TabsList>
        { contents.map(c => {
          return (
            <TabsTrigger
              key={ c.contentId }
              value={ c.contentId }
              className='font-bold'
            >
              { c.title }
            </TabsTrigger>
          );
        })}
      </TabsList>
      { contents.map(c => {
        const playCount = contentActivity.videos[c.contentId]?.playCount || 0;
        return (
          <TabsContent
            key={ c.contentId }
            value={ c.contentId }
          >
            <YouTubePlayer
              content={ c }
              onPlayThresholdReached={handlePlayThresholdReached}
            />
            <div
              className='flex justify-end items-center py-1'
            >
              {playCount > 0 && <Badge variant="secondary">{playCount}回視聴</Badge>}
            </div>
            <div
              className='p-2 border rounded-b-md text-sm text-foreground'
            >
              <p>＜動画の見方＞ </p>
              <ul className='list-inside list-disc pl-6'>
                <li>ノートを準備して動画の内容をまとめられるようにする</li>
                <li>動画は早送り・倍速再生OK</li>
                <li>操作の説明は動画を止めてやってみる</li>
                <li>疑問に思ったことは動画を止めて調べてみるOR質問してみる</li>
              </ul>
              <p>＜動画の説明＞</p>
              <p className='pl-6'>
                { c.description || "動画の説明はありません。" }
              </p>
            </div>
          </TabsContent>
        );
      })}
    </Tabs>
  )
}

export function MovieWithCounter({
  contents
}: {
  contents: Content[],
}) {

  if (contents.length == 0) {
    return (
      <NotFound text="このレッスンで使用する動画はありません。" />
    );
  }

  return (
    <Tabs
      defaultValue={ contents[0].contentId }
    >
      <TabsList>
        { contents.map(c => {
          return (
            <TabsTrigger
              key={ c.contentId }
              value={ c.contentId }
              className='font-bold'
            >
              { c.title }
            </TabsTrigger>
          );
        })}
      </TabsList>
      { contents.map((c) => {
        return (
          <TabsContent
            key={ c.contentId }
            value={ c.contentId }
          >
            <div
              className='p-2 border rounded-b-md text-sm text-foreground'
            >
              <p>＜動画の見方＞ </p>
              <ul className='list-inside list-disc pl-6'>
                <li>ノートを準備して動画の内容をまとめられるようにする</li>
                <li>動画は早送り・倍速再生OK</li>
                <li>操作の説明は動画を止めてやってみる</li>
                <li>疑問に思ったことは動画を止めて調べてみるOR質問してみる</li>
              </ul>
              <p>＜動画の説明＞</p>
              <p className='pl-6'>
                { c.description || "動画の説明はありません。" }
              </p>
            </div>
          </TabsContent>
        );
      })}
    </Tabs>
  )
}
