import React from "@node_modules/@types/react";

export type OperationResult<Tvalues=unknown, Tmessages=unknown> = {
  isSuccess: boolean;
  values: Tvalues;
  messages: Tmessages;
}

export type OptionProps = {
  label: React.ReactNode,
  value: string,
}

export type User = {
  userId: string,
  clerkId: string,
  type: string,
  name: string,
  email: string,
}

export type MessageUser = {
  userId?: string,
  clerkId?: string,
  type?: string,
  name?: string,
  email?: string,
  other?: string,
}

export type UserAndStudent = {
  userId?: string;
  username?: string;
  email?: string;
  type:string;
  schoolName?: string,
  admissionYear?: number,
  studentNumber?: number,
}

export type MessageUserAndStudent = {
  userId?: string;
  username?: string;
  email?: string;
  type?: string;
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

export type SubjectAndUnits = {
  subjectId: string;
  subjectName: string;
  description?: string;
  isPublic: boolean;
  units: UnitAndLessons[];
}

export type MessageSubjectAndUnits = {
  subjectId?: string;
  subjectName?: string;
  description?: string;
  isPublic?: string;
  units?: string;
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

export type UnitAndLessons = {
  unitId: string;
  unitName: string;
  subjectId: string;
  description?: string;
  isPublic: boolean;
  lessons: Lesson[];
}

export type MessageUnitAndLessons = {
  unitId?: string;
  unitName?: string;
  subjectId?: string;
  description?: string;
  isPublic?: string;
  lessons?: string;
  other?: string
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

export type LessonAndContents = {
  unit_id: string;
  title: string;
  description: string;
  lesson_id: string;
  is_public: boolean;
  movies: Content[],
  quiz: Content[],
  others: Content[],
}

export type MessageLessonAndContents = {
  unit_id?: string;
  title?: string;
  description?: string;
  lesson_id?: string;
  is_public?: string;
  movies?: string,
  quiz?: string,
  others?: string,
  other?: string,
}


export type Content = {
  contentId: string;
  title: string;
  description: string;
  type: string;
  isPublic: boolean;
  url: string;
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

export type ContentAndLessons = {
  contentId: string;
  title: string;
  description: string;
  type: string;
  isPublic: boolean;
  url: string;
  lessons: Lesson[];
}

export type MessageContentAndLessons = {
  contentId?: string;
  title?: string;
  description?: string;
  type?: string;
  isPublic?: string;
  url?: string;
  lessons?: string;
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
