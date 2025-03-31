import React from "@node_modules/@types/react";
import { Questions } from "./quiz";

export interface OperationResult<Tvalues=unknown, Tmessages=unknown> {
  isSuccess: boolean;
  values: Tvalues;
  messages: Tmessages;
}

export interface OptionProps {
  label: React.ReactNode,
  value: string,
}

export interface Message {
  other?: string;
}

export interface User {
  userId: string,
  clerkId: string,
  type: string,
  name: string,
  email: string,
}

export interface MessageUser {
  userId?: string,
  clerkId?: string,
  type?: string,
  name?: string,
  email?: string,
  other?: string,
}

export interface UserAndStudent {
  userId?: string;
  username: string;
  email: string;
  type:string;
  schoolName: string,
  admissionYear: number,
  studentNumber: number,
}

export interface MessageUserAndStudent {
  userId?: string;
  username?: string;
  email?: string;
  type?: string;
  schoolName?: string;
  admissionYear?: string;
  studentNumber?: string;
  other?: string;
}

export interface Subject {
  subjectId: string;
  subjectName: string;
  description?: string;
  isPublic: boolean;
}

export interface MessageSubject {
  subjectId?: string;
  subjectName?: string;
  description?: string;
  isPublic?: string;
  other?: string;
}

export interface SubjectAndUnits {
  subjectId: string;
  subjectName: string;
  description?: string;
  isPublic: boolean;
  units: UnitAndLessons[];
}

export interface MessageSubjectAndUnits {
  subjectId?: string;
  subjectName?: string;
  description?: string;
  isPublic?: string;
  units?: string;
  other?: string; 
}

export interface Unit {
  unitId: string;
  unitName: string;
  subjectId: string;
  description?: string;
  isPublic: boolean;
}

export interface MessageUnit {
  unitId?: string;
  unitName?: string;
  subjectId?: string;
  description?: string;
  isPublic?: string;
  other?:string;
}

export interface UnitAndLessons {
  unitId: string;
  unitName: string;
  subjectId: string;
  description?: string;
  isPublic: boolean;
  lessons: Lesson[];
}

export interface MessageUnitAndLessons {
  unitId?: string;
  unitName?: string;
  subjectId?: string;
  description?: string;
  isPublic?: string;
  lessons?: string;
  other?: string
}

export interface Lesson {
  lessonId: string;
  title: string;
  description: string;
  isPublic: boolean;
  unitId: string;
}

export interface MessageLesson {
  lessonId?: string;
  title?: string;
  description?: string;
  isPublic?: string;
  unitId?: string;
  other?: string;
}

export interface LessonAndContents {
  unit_id: string;
  title: string;
  description: string;
  lesson_id: string;
  is_public: boolean;
  movies: Content[],
  quiz: Content[],
  others: Content[],
}

export interface MessageLessonAndContents {
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


export interface Content {
  contentId: string;
  title: string;
  description: string;
  type: string;
  isPublic: boolean;
  url: string;
}

export interface MessageContent {
  contentId?: string;
  title?: string;
  description?: string;
  type?: string;
  isPublic?: string;
  url?: string;
  other?: string;
}

export interface ContentAndLessons {
  contentId: string;
  title: string;
  description: string;
  type: string;
  isPublic: boolean;
  url: string;
  lessons: Lesson[];
}

export interface MessageContentAndLessons {
  contentId?: string;
  title?: string;
  description?: string;
  type?: string;
  isPublic?: string;
  url?: string;
  lessons?: string;
  other?: string;
}


export interface LessonContent {
  lessonId: string;
  contentId: string;
}
export interface MessageLessonContent {
  lessonId?: string;
  contentId?: string;
  other?: string;
}

export interface Progress {
  studentId: string;
  contentId: string;
  viewCount: number;
  testScore: number;
}

export interface MessageProgress {
  studentId?: string;
  contentId?: string;
  viewCount?: string;
  testScore?: string;
  other?: string;
}

export interface ContentProgress {
  contentId: string;
  title: string;
  type: string;
  count: number;
}

export interface MessageContentProgress {
  contentId?: string;
  title?: string;
  type?: string;
  count?: string;
  other?: string;
}

export interface Quiz {
  quizId: string;
  contentId: string;
  title: string;
  description: string;
  isPublic: boolean;
  questions: Questions;
}

export interface MessageQuiz extends Message {
  quizId?: string;
  contentId?: string;
  title?: string;
  description?: string;
  isPublic?: string;
  questions?: string;
}

export interface Image {
  imageId: string;
  title: string;
  imageUrl: string;
}