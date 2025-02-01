import { InnerCard } from "@components/ui/card";
import { Header3 } from "@components/ui/title";
import { InternalLink } from "@components/ui/myLink";

export async function LessonCard({
  lessonId, title
}: {
  lessonId: string,
  title: string,
}) {
  return (
    <InnerCard
      bgColor='bg-white'
      borderColor='border-stone-200'
    >
      <div
        className="flex items-center"
      >
        <div
          className="grow"
        > 
          <Header3 
            title={ `${lessonId} - ${title}` }

          />
          <p
            className="text-sm text-gray-400"
          >
            実施回数: 13回
          </p>
        </div>
        <div
          className=""
        >
          <InternalLink 
            href={ `/lesson/${ lessonId }` }
          />
        </div>
      </div>
    </InnerCard>
  )
}