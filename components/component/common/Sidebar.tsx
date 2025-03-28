import {
  Sidebar,
  SidebarContent,
} from "@/components/ui/sidebar";
import { SmallLessonList } from "./LessonList";
import { Header3 } from "@components/ui/title";

export default function AppSidebar() {
  return (
    <Sidebar
      className="absolute left-0 h-full border-l"
    >
      <SidebarContent
      >
        <div>
          <div
            className="p-2 m-2 mb-4 rounded-md border-gray-400"
          >
            <Header3 title="情報Ⅰ" />
            <SmallLessonList subjectId="1" />
          </div>
          <div
            className="p-2 m-2 rounded-md border-gray-400"
          >
            <Header3 title="情報Ⅱ" />
            <SmallLessonList subjectId="2" />
          </div>
        </div>
      </SidebarContent>
    </Sidebar>  
  );
}