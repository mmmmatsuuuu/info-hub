import { getPublicLesson } from "@lib/dbController/lesson";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@components/component/common/Sidebar";
import { Header1, Header2 } from "@components/ui/title";
import { OuterCard, InnerCard } from "@components/ui/card";
import { Movie, MovieWithCounter } from "@components/component/common/Movie";
import { Quiz } from "@components/component/common/Quiz";
import { Others } from "@components/component/common/Others";
import { NotFoundWithRedirect } from "@components/ui/notFound";
import Footer from "@components/component/common/Footer";
import { auth } from "@clerk/nextjs/server";
import { getUserWithClerkId } from '@lib/dbController/user';
import { redirect } from 'next/navigation';
import { User } from "@/types/dbOperation";

export default async function LessonPage({
  params
}: {
  params: Promise<{ lesson_id: string }>
}) {
  // ユーザデータがない場合、registerページにリダイレクト
  const { userId } = await auth();
  let userData:User | null = null;
  if (userId) {
    const res = await getUserWithClerkId(userId);
    if (!res.values) {
      return redirect("/register");
    }
    userData = res.values;
  }

  // レッスンが見つからなった場合の処理
  const p = await params;
  const res = await getPublicLesson(p.lesson_id);
  const lesson = res.values;
  if (!res.isSuccess || !lesson ) {
    return (
      <NotFoundWithRedirect text="レッスンが見つかりませんでした。" href="/" />
    )
  }


  return (
    <SidebarProvider
      defaultOpen={ true }
    >
      <AppSidebar />
      <main
        className="p-2 w-full h-[calc(100vh-64px)] overflow-y-scroll"
      >
        <SidebarTrigger />
        <OuterCard>
          <div
            className="flex flex-col gap-4"
          >
            <Header1 title={ lesson.title } />
            <p>
              { lesson.description }
            </p>
            <InnerCard>
              <Header2 title="動画" />
              {
                userData != null
                ?
                <MovieWithCounter
                  contents={ lesson.movies }
                  studentId={ userData.userId }
                />
                :
                <Movie
                  contents={ lesson.movies }
                />
              }
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
        <Footer />
      </main>
    </SidebarProvider>
  )
}