import React from 'react';
import { OuterCard } from '@components/ui/card';
import { Header1 } from '@components/ui/title';
import { LessonList } from '@components/component/LessonList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs';
import Footer from '@components/component/Footer';
import { auth } from "@clerk/nextjs/server";
import { getUserWithClerkId } from '@lib/dbController/user';
import { redirect } from 'next/navigation';

export default async function HomePage() {
  // ユーザデータがない場合、registerページにリダイレクト
  const { userId } = await auth();
  let userData;
  if (userId) {
    const res = await getUserWithClerkId(userId);
    if (res.isSuccess = false) {
      return redirect("/register");
    }
    userData = res.values;
  }



  return (
    <div
      className='w-full py-6 overflow-y-scroll'
    >
      <Tabs 
        defaultValue='info1' 
        defaultChecked
      >
        <TabsList>
          <TabsTrigger 
            value='info1'
            className='px-6'
          >
            情報Ⅰ
          </TabsTrigger>
          <TabsTrigger 
            value='info2'
            className='px-6'
          >
            情報Ⅱ
          </TabsTrigger>
        </TabsList>
        <TabsContent value='info1'>
          <div
            className="flex flex-col gap-6"
          >
            <OuterCard>
              <Header1
                title='情報Ⅰ'
              />
              <LessonList 
                subjectId='1'
              />
            </OuterCard>
          </div>
        </TabsContent>
        <TabsContent value='info2'>
          <div
            className="flex flex-col gap-6"
          >
            <OuterCard>
              <Header1
                title='情報Ⅱ'
              />
              <LessonList 
                subjectId='2'
              />
            </OuterCard>
          </div>
        </TabsContent>
        <Footer />
      </Tabs>
    </div>
  )
}