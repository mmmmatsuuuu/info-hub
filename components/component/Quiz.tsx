import { Content } from "@/types/dbOperation";
import { InnerCard } from "@components/ui/card";
import { ExternalLink } from "@components/ui/myLink";
import { Header3 } from "@components/ui/title";
import { NotFound } from "@components/ui/notFound";
export function Quiz({
  contents
}: {
  contents: Content[]
}) {
  if (contents.length == 0) {
    return (
      <NotFound text="このレッスンで使用する小テストはありません。" />
    );
  }
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
                <p>
                  { c.description }
                </p>
              </div>
              <div>
                <ExternalLink
                  href={ c.url }
                />
              </div>
            </div>
          </InnerCard>
        );
      })}
    </div>
  )
}