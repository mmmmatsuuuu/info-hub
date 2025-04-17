import { Content } from "@/types/dbOperation";
import { InnerCard } from "@components/ui/card";
import { ExternalLink } from "@components/ui/myLink";
// import { InternalLink } from "@components/ui/myLink";
import { Header3 } from "@components/ui/title";
import { NotFound } from "@components/ui/notFound";
// import { getLessonQuiz } from "@lib/dbController/quiz";

export async function Quiz({
  contents, lessonId
}: {
  contents: Content[],
  lessonId: string
}) {
  if (contents.length == 0) {
    return (
      <NotFound text="このレッスンで使用する小テストはありません。" />
    );
  }
  // const res = await getLessonQuiz(lessonId);
  // if (res.isSuccess === false) {
  //   return (
  //     <NotFound text={ res.messages.other || "" } />
  //   );
  // }
  // const quiz = res.values;
  // console.log(quiz);
  console.log(lessonId);
  return (
    <div
      className="flex flex-col gap-4"
    >
      { contents.map(c => {
        return (
          <InnerCard
            key={c.contentId}
          >
            <div
              className="flex items-center p-2"
            >
              <div
                className="grow"
              >
                <Header3 title={ c.title } />
                <p
                  className="text-xs"
                >
                  { c.description }
                </p>
              </div>
              <div
                className="w-[96px]"
              >
                <ExternalLink
                  cls="w-full"
                  href={ c.url }
                />
              </div>
            </div>
          </InnerCard>
        );
      })}
      {/* { quiz.map(q => {
        return (
          <InnerCard
            key={ q.quizId }
          >
            <div
              className="flex items-center p-2"
            >
              <div
                className="grow"
              >
                <Header3 title={ q.title } />
                <p
                  className="text-xs"
                >
                  { q.description }
                </p>
              </div>
              <div
                className="w-[96px]"
              >
                <InternalLink
                  cls="w-full"
                  href={ `/quiz/${q.quizId}` }
                />
              </div>
            </div>
          </InnerCard>
        );
      })} */}

    </div>
  )
}