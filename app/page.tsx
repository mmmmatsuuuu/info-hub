import React, { Suspense } from 'react';
import { OuterCard } from '@components/ui/card';
import { Header1 } from '@components/ui/title';
import { LessonList } from '@components/component/common/LessonList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs';
import Footer from '@components/component/common/Footer';
import { auth } from "@clerk/nextjs/server";
import { getUserWithClerkId } from '@lib/dbController/user';
import { redirect } from 'next/navigation';
import { Loading } from '@components/ui/loading';

export default async function HomePage() {
  // ユーザデータがない場合、registerページにリダイレクト
  const { userId } = await auth();
  if (userId) {
    const res = await getUserWithClerkId(userId);
    if (res.isSuccess = false) {
      return redirect("/register");
    }
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
              <Suspense fallback={ <Loading /> }>
                <LessonList 
                  subjectId='1'
                />
              </Suspense>
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
              <Suspense fallback={ <Loading /> }>
                <LessonList 
                  subjectId='2'
                />
              </Suspense>
            </OuterCard>
          </div>
        </TabsContent>
        <Footer />
      </Tabs>
    </div>
  )
}