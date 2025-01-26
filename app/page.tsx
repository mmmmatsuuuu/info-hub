import React from 'react';
import LessonList from '@components/component/LessonList';

export default function Home() {
  return (
    <div
      className=""
    >
      <h1 className='text-gray-900 text-4xl font-bold'>情報Ⅰ</h1>
      <LessonList 
        subjectId="1"
      />
      <h1 className='text-gray-900 text-4xl font-bold mt-24'>情報Ⅱ</h1>
      <LessonList 
        subjectId='2'
      />
    </div>
  )
}