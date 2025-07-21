import AppSidebar from "@components/component/common/Sidebar";
import { Suspense } from "react";
import LessonContent from "./LessonContent";
import { Loader2 } from "lucide-react";
import SidebarToggleButton from "@components/component/common/SidebarToggleButton";

export default async function LessonPage({
  params
}: {
  params: { lesson_id: string }
}) {
  const lessonId = params.lesson_id;

  return (
    <div className="flex w-full">
      <div id="sidebar-container" className="bg-white dark:bg-gray-950 transition-all duration-300 ease-in-out border-r">
        <AppSidebar />
      </div>
      <SidebarToggleButton />
      <main
        id="lesson-content-container"
        className="p-2 h-[calc(100vh-64px)] overflow-y-scroll flex-1 pl-[28px]"
      >
        <Suspense fallback={
          <div className="flex justify-center items-center h-full w-full">
            <Loader2 className="animate-spin text-primary" size={48} />
          </div>
        }>
          <LessonContent lessonId={lessonId} />
        </Suspense>
      </main>
    </div>
  )
}