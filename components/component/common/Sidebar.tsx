import { SmallLessonList } from "./LessonList";

export default function AppSidebar() {
  return (
    <div
      className="h-[calc(100vh-64px)] overflow-y-scroll"
    >
      <div
        className="overflow-y-auto"
      >
        <div>
          <div
            className="p-2 m-2 mb-4 rounded-md"
          >
            <h3 className="text-md font-bold text-foreground my-1">情報Ⅰ</h3>
            <SmallLessonList subjectId="1" />
          </div>
          <div
            className="p-2 m-2 rounded-md"
          >
            <h3 className="text-md font-bold text-foreground my-1">情報Ⅱ</h3>
            <SmallLessonList subjectId="2" />
          </div>
        </div>
      </div>
    </div>  
  );
}