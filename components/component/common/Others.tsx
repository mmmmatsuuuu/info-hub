import { Content } from "@/types/dbOperation";
import { NotFound } from "@components/ui/notFound";
import Link from "next/link";
import { Button } from "@components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";

export function Others({
  contents
}: {
  contents: Content[]
}) {
  if (contents.length == 0) {
    return (
      <NotFound text="このレッスンで使用する教材はありません。" />
    );
  }
  return (
    <div
      className="flex flex-col gap-4"
    >
      { contents.map(c => {
        return (
          <Card
            key={c.contentId}
            className="w-full flex flex-col md:flex-row items-center justify-between p-4"
          >
            <CardHeader className="p-0 md:w-5/6">
              <CardTitle className="text-lg font-bold text-gray-800">{ c.title }</CardTitle>
              <CardContent className="p-0 text-sm text-gray-600">
                { c.description }
              </CardContent>
            </CardHeader>
            <CardFooter className="p-0 mt-4 md:mt-0 md:w-1/6 flex justify-center">
              <Button asChild className="w-full">
                <Link
                  href={ c.url }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  開く
                </Link>
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  )
}