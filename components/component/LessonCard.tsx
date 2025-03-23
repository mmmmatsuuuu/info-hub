import { InnerCard, SmallCard } from "@components/ui/card";
import { Header3 } from "@components/ui/title";
import { InternalLink } from "@components/ui/myLink";
import Link from "@node_modules/next/link";

export function LessonCard({
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
        </div>
        <div
          className="py-4"
        >
          <InternalLink 
            href={ `/lesson/${ lessonId }` }
            text="開く"
            cls="px-8"
          />
        </div>
      </div>
    </InnerCard>
  )
}

export async function SmallLessonCard({
  lessonId, title
}: {
  lessonId: string,
  title: string,
}) {
  return (
    <Link
      href={ `/lesson/${ lessonId }` }
      className=""
    >
      <SmallCard
        bgColor="bg-white hover:bg-gray-700"
        textColor="text-gray-500 hover:text-white"
      >
            { `${lessonId} - ${ title }` }
      </SmallCard>
    </Link>
  )
}