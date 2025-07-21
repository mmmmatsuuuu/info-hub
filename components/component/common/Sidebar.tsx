import { SmallLessonList } from "./LessonList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs';

export default function AppSidebar() {
  return (
    <div
      className="h-[calc(100vh-64px)] overflow-y-scroll"
    >
      <Tabs
        defaultValue='info1'
        className="w-full pt-4"
      >
        <TabsList className="flex w-full mb-6">
          <TabsTrigger 
            value='info1'
            className='flex-1 text-md py-1'
          >
            情報Ⅰ
          </TabsTrigger>
          <TabsTrigger 
            value='info2'
            className='flex-1 text-md py-1'
          >
            情報Ⅱ
          </TabsTrigger>
        </TabsList>
        <TabsContent value='info1'>
          <SmallLessonList subjectId="1" />
        </TabsContent>
        <TabsContent value='info2'>
          <SmallLessonList subjectId="2" />
        </TabsContent>
      </Tabs>
    </div>  
  );
}