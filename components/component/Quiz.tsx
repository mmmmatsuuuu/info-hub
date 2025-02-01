import { Content } from "@node_modules/@prisma/client";
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
            key={c.content_id}
          >
            <div
              className="flex items-center"
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