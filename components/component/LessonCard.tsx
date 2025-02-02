import { InnerCard, SmallCard } from "@components/ui/card";
import { Header3 } from "@components/ui/title";
import { InternalLink } from "@components/ui/myLink";
import Link from "@node_modules/next/link";

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