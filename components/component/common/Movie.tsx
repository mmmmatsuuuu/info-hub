import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs';
import { Content, Progress } from '@/types/dbOperation';
import { NotFound } from '@components/ui/notFound';
import { YouTubePlayerForms } from "../forms/youtubePlayerForms";
import { YouTubePlayer } from './YoutubePlayer';
import { getProgress } from '@lib/dbController/progress';

export async function Movie({
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
      { contents.map(c => {
        return (
          <TabsContent
            key={ c.contentId }
            value={ c.contentId }
          >
            <YouTubePlayer
              url={ c.url }
            />
            <div
              className='p-2 border rounded-b-md text-sm text-gray-500'
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

export async function MovieWithCounter({
  contents, studentId
}: {
  contents: Content[],
  studentId: string,
}) {

  if (contents.length == 0) {
    return (
      <NotFound text="このレッスンで使用する動画はありません。" />
    );
  }

  const progressList:Progress[] = [];

  for (let i = 0; i < contents.length; i++) {
    const res = await getProgress(studentId, contents[i].contentId);
    const progress:Progress = {
      studentId: studentId,
      contentId: contents[i].contentId,
      viewCount: res.isSuccess ? res.values.viewCount : 0,
      testScore: res.isSuccess ? res.values.testScore : 0,
    }
    progressList.push(progress);
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
      { contents.map((c, index) => {
        return (
          <TabsContent
            key={ c.contentId }
            value={ c.contentId }
          >
            <YouTubePlayerForms
              progress={ progressList[index]}
              url={ c.url }
            />
            <div
              className='p-2 border rounded-b-md text-sm text-gray-500'
            >
              <div
                className='flex flex-row-reverse'
              >
                <div
                  className='bg-gray-200 rounded p-1'
                >
                  { `再生回数: ${ progressList[index].viewCount }` }
                </div>
              </div>
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
