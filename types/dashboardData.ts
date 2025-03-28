export interface LessonProgress {
  lessonId: string;
  title: string;
  progress: number;
}

export interface UnitWithLessons {
  unitId: string;
  unitName: string;
  lessons: LessonProgress[];
}

export interface SubjectWithUnits {
  subjectId: string;
  subjectName: string;
  units: UnitWithLessons[];
}

export interface StudentProgress {
  studentId: string;
  progress: SubjectWithUnits[];
}
