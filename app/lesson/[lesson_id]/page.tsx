import { getLesson } from "@lib/dbController";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@components/component/Sidebar";
import { Header1, Header2 } from "@components/ui/title";
import { OuterCard, InnerCard } from "@components/ui/card";
import { Movie } from "@components/component/Movie";
import { Quiz } from "@components/component/Quiz";
import { Others } from "@components/component/Others";
import { NotFoundWithRedirect } from "@components/ui/notFound";
import Footer from "@components/component/Footer";
import { auth } from "@clerk/nextjs/server";
import { getUserWithClerkId } from '@lib/dbController';
import { redirect } from 'next/navigation';

export default async function LessonPage({
  params
}: {
  params: Promise<{ lesson_id: string }>
}) {
  // ユーザデータがない場合、registerページにリダイレクト
  const { userId } = await auth();
  if (userId) {
    const userData = await getUserWithClerkId(userId);
    if (!userData) {
      return redirect("/register");
    }
  }

  // レッスンが見つからなった場合の処理
  const p = await params;
  const lesson = await getLesson(p.lesson_id);
  if (!lesson) {
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
              <Movie
                contents={ lesson.movies }
              />
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