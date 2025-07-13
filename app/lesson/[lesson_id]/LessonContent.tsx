import { Movie } from "@components/component/common/Movie";
import { Others } from "@components/component/common/Others";
import { NotFound } from "@components/ui/notFound";
import { Card } from "@/components/ui/card";
import { getPublicLesson } from "@lib/dbController/lesson";
import { Quiz } from "@components/component/common/Quiz";

export default async function LessonContent({ lessonId }: { lessonId: string }) {
  const res = await getPublicLesson(lessonId);
  const lesson = res.values;

  if (!res.isSuccess || !lesson) {
    return (
      <NotFound text="レッスンが見つかりませんでした。" />
    );
  }

  return (
    <div
      className="flex flex-col gap-4 w-full"
    >
      <h1 className="w-full border-b-2 border-gray-400 my-2 text-2xl font-bold text-foreground">{ lesson.title }</h1>
      <p>
        { lesson.description }
      </p>
      <Card className="w-full p-2 rounded-md bg-card border border-border text-foreground">
        <h2 className="text-xl font-bold text-foreground my-1">動画</h2>
        <Movie
          contents={ lesson.movies }
        />
      </Card>
      <Card className="w-full p-2 rounded-md bg-card border border-border text-foreground">
        <h2 className="text-xl font-bold text-foreground my-1">小テスト</h2>
        <Quiz
          contents={ lesson.quiz }
          lessonId={ lesson.lesson_id }
        />
      </Card>
      <Card className="w-full p-2 rounded-md bg-card border border-border text-foreground">
        <h2 className="text-xl font-bold text-foreground my-1">その他の教材</h2>
        <Others
          contents={lesson.others}
        />
      </Card>
    </div>
  );
}