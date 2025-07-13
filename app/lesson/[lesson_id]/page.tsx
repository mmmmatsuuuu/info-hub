import AppSidebar from "@components/component/common/Sidebar";
import Footer from "@components/component/common/Footer";
import { Suspense } from "react";
import LessonContent from "./LessonContent";
import { Loader2 } from "lucide-react";

export default async function LessonPage({
  params
}: {
  params: Promise<{ lesson_id: string }>
}) {
  const p = await params;
  const lessonId = p.lesson_id;

  return (
    <div
      className="max-w-5xl grid grid-cols-7 m-auto"
    >
      <div
        className="col-span-2"
      >
        <AppSidebar />
      </div>
      <main
        className="p-2 col-span-5 h-[calc(100vh-64px)] overflow-y-scroll"
      >
        <Suspense fallback={
          <div className="flex justify-center items-center h-full w-full">
            <Loader2 className="animate-spin text-primary" size={48} />
          </div>
        }>
          <LessonContent lessonId={lessonId} />
        </Suspense>
        <Footer />
      </main>
    </div>
  )
}