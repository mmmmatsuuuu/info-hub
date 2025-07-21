'use client';

import { Content } from "@/types/dbOperation";
import { NotFound } from "@components/ui/notFound";
import Link from "next/link";
import { Button } from "@components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useUserActivityStore } from '@/hooks/useUserActivityStore';

export function Quiz({
  contents
}: {
  contents: Content[],
}) {
  const { incrementQuizClick, contentActivity } = useUserActivityStore();

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
        const clickCount = contentActivity.quizzes[c.contentId]?.clickCount || 0;
        return (
          <Card
            key={c.contentId}
            className="w-full flex flex-col md:flex-row items-center justify-between p-4"
          >
            <CardHeader className="p-0 md:w-5/6">
              <CardTitle className="text-lg font-bold text-foreground">
                { c.title } {clickCount > 0 && <Badge variant="secondary" className="ml-2">{clickCount}回クリック</Badge>}
              </CardTitle>
              <CardContent className="p-0 text-sm text-foreground">
                { c.description }
              </CardContent>
            </CardHeader>
            <CardFooter className="p-0 mt-4 md:mt-0 md:w-1/6 flex justify-center">
              <Button asChild className="w-full">
                <Link
                  href={ c.url }
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => incrementQuizClick(c.contentId)}
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