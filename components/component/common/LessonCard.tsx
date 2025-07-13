import Link from "next/link";
import { Button } from "@components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";

export function LessonCard({
  lessonId, title
}: {
  lessonId: string,
  title: string,
}) {

  return (
    <Card className="flex flex-col md:flex-row items-center justify-between p-4">
      <CardHeader className="p-0">
        <CardTitle className="text-lg font-bold text-foreground">
          { `${lessonId} - ${title}` }
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 mt-2 md:mt-0">
        {/* 必要に応じてここに詳細情報を追加 */}
      </CardContent>
      <CardFooter className="p-0 mt-4 md:mt-0">
        <Button asChild
          className="w-full"
        >
          <Link 
            href={ `/lesson/${ lessonId }` }
          >
            開く
          </Link>
        </Button>
      </CardFooter>
    </Card>
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
      className="block"
    >
      <Card className="p-2 hover:bg-accent hover:text-accent-foreground">
        <CardTitle className="text-sm font-medium text-foreground">
          { `${lessonId} - ${ title }` }
        </CardTitle>
      </Card>
    </Link>
  )
}