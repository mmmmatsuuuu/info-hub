import { getLesson } from "@lib/dbController";
import { Header1, Header2 } from "@components/ui/title";
import { OuterCard, InnerCard } from "@components/ui/card";
import { Movie } from "@components/component/Movie";
import { Quiz } from "@components/component/Quiz";
import { Others } from "@components/component/Others";
import { NotFoundWithRedirect } from "@components/ui/notFound";

export default async function LessonPage({
  params
}: {
  params: Promise<{ lesson_id: string }>
}) {
  const p = await params;
  const lesson = await getLesson(p.lesson_id);

  if (!lesson) {
    return (
      <NotFoundWithRedirect text="レッスンが見つかりませんでした。" href="/" />
    )
  }
  return (
    <OuterCard

    >
      <div
        className="flex flex-col gap-4"
      >
        <Header1 title={ lesson.title } />
        <p>
          { lesson.description }
        </p>
        <InnerCard>
          <Header2 title="動画" />
          <Movie
            contents={ lesson.movies }
          />
        </InnerCard>
        <InnerCard>
          <Header2 title="小テスト" />
          <Quiz 
            contents={lesson.quiz}
          />
        </InnerCard>
        <InnerCard>
          <Header2 title="その他の教材" />
          <Others
            contents={lesson.others}
          />
        </InnerCard>
      </div>
    </OuterCard>
  )
}