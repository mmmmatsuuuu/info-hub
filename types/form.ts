import React from "@node_modules/@types/react";

export type FormState<Tvalues=any, Tmessage=any> = {
  isSuccess: boolean;
  values: Tvalues;
  messages: Tmessage;
}

export type OptionProps = {
  label: React.ReactNode,
  value: string,
}

export type UserAndStudent = {
  userId?: string;
  username?: string;
  email?: string;
  schoolName?: string,
  admissionYear?: number,
  studentNumber?: number,
}

export type MessageUserAndStudent = {
  userId?: string;
  username?: string;
  email?: string;
  schoolName?: string;
  admissionYear?: string;
  studentNumber?: string;
  other?: string;
}

export type Subject = {
  subjectId: string;
  subjectName: string;
  description?: string;
  isPublic: boolean;
}

export type MessageSubject = {
  subjectId?: string;
  subjectName?: string;
  description?: string;
  isPublic?: string;
  other?: string;
}

export type Unit = {
  unitId: string;
  unitName: string;
  subjectId: string;
  description?: string;
  isPublic: boolean;
}

export type MessageUnit = {
  unitId?: string;
  unitName?: string;
  subjectId?: string;
  description?: string;
  isPublic?: string;
  other?:string;
}

export type Lesson = {
  lessonId: string;
  title: string;
  description: string;
  isPublic: boolean;
  unitId: string;
}

export type MessageLesson = {
  lessonId?: string;
  title?: string;
  description?: string;
  isPublic?: string;
  unitId?: string;
  other?: string;
}

export type Content = {
  contentId: string;
  title: string;
  description: string;
  type: string;
  isPublic: boolean;
  url: string;
}

export type ContentWithLessons = {
  contentId: string;
  title: string;
  description: string;
  type: string;
  isPublic: boolean;
  url: string;
  lessons: Lesson[];
}

export type MessageContent = {
  contentId?: string;
  title?: string;
  description?: string;
  type?: string;
  isPublic?: string;
  url?: string;
  other?: string;
}

export type LessonContent = {
  lessonId: string;
  contentId: string;
}
export type MessageLessonContent = {
  lessonId?: string;
  contentId?: string;
  other?: string;
}
