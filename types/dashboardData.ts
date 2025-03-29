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

export interface UnitProgress {
  unitId: string;
  unitName: string;
  progress: number;
}

export interface SubjectWithUnits<T extends UnitWithLessons | UnitProgress> {
  subjectId: string;
  subjectName: string;
  units: T[];
}

export interface StudentProgress {
  studentId: string;
  studentNumber?: string;
  name?: string;
  progress: SubjectWithUnits<UnitWithLessons>[];
}

export interface StudentsProgress {
  studentId: string;
  studentNumber?: string;
  name?: string;
  progress: SubjectWithUnits<UnitProgress>[];
}
