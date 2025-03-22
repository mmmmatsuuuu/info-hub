import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs';
import { getYoutubeId } from '@lib/regax';
import { Content } from '@node_modules/@prisma/client';
import { auth } from '@clerk/nextjs/server';
import { NotFound } from '@components/ui/notFound';

export async function Movie({
  contents
}: {
  contents: Content[]
}) {
  const { userId } = await auth();
  let progress;

  if (contents.length == 0) {
      return (
        <NotFound text="このレッスンで使用する動画はありません。" />
      );
    }

  if (!userId) {
    progress = "";
  } else {
    progress = "視聴回数: 3回"
  }
  return (
    <Tabs
      defaultValue={ contents[0].content_id }
    >
      <TabsList>
        { contents.map(c => {
          return (
            <TabsTrigger
              key={ c.content_id }
              value={ c.content_id }
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
            key={ c.content_id }
            value={ c.content_id }
          >
            <VideoPlayer
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
                  { progress }
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

export const VideoPlayer = ({
  url
}: {
  url: string
}) => {
  const videoId = getYoutubeId(url);
  return (
    <div className="relative w-full pb-[56.25%] h-0">
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  )
}