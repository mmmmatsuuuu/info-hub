
export type SelectOption = {
  text: string;
  img?: string;
  isCorrect: boolean;
}

export type SortOption = {
  id: number;
  text: string;
  img?: string;
}

export interface Question {
  questionId: number;
  questionText: string;
  img?: string;
}

export interface ShortAnswerQuestion extends Question {
  type: "記述式";
  correct: string;
}

export interface MultipleChoiceQuestion extends Question {
  type: "単一選択";
  options: SelectOption[];
}

export interface MultipleSelectQuestion extends Question {
  type: "複数選択";
  options: SelectOption[];
}

export interface SortQuestion extends Question {
  type: "並び換え";
  options: SortOption[];
  correctOrder: number[];
}

export type Questions = (ShortAnswerQuestion | MultipleChoiceQuestion | MultipleSelectQuestion | SortQuestion)[];

export interface AnswerType {
  questionId: number;
  questionType: string;
  answer: any;
}

export interface UserAnswer {
  quizId: string;
  userId: string;
  answers: AnswerType[];
}

export interface QuizResult {
  quizId: string;
  userId: string;
  score: number;
  pointAllocation: number;
  answers: AnswerType[];
  correctAnswers: AnswerType[];
}