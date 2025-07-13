import React, { Suspense } from 'react';
import { LessonList } from '@components/component/common/LessonList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs';
import Footer from '@components/component/common/Footer';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Loading from './loading';

export default async function HomePage() {

  return (
    <div
      className='max-w-5xl mx-auto w-full py-6 overflow-y-scroll px-4'
    >
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">情報学習ハブ</h1>
      <Tabs 
        defaultValue='info1' 
        className="w-full"
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
          <Card className="p-6 border-0 shadow-none">
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-2xl font-bold text-gray-800">情報Ⅰ レッスン一覧</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Suspense fallback={ <Loading /> }>
                <LessonList 
                  subjectId='1'
                />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value='info2'>
          <Card className="p-6 border-0 shadow-none">
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-2xl font-bold text-gray-800">情報Ⅱ レッスン一覧</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Suspense fallback={ <Loading /> }>
                <LessonList 
                  subjectId='2'
                />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>
        <Footer />
      </Tabs>
    </div>
  )
}