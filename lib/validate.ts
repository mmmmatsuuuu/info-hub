import { string, z } from "@node_modules/zod";
import { UserAndStudent, Subject, Unit, Content, Lesson, LessonContent } from "@/types/form";
import { Description } from "@node_modules/@radix-ui/react-dialog/dist/index.mjs";

export function ValidateUserAndStudent(
  data: UserAndStudent
) {
  // 編数定義
  const thisYear = new Date().getFullYear()+1;

  // バリデーション定義
  const dataSchema = z.object({
    username: z
      .string()
      .min(2, "ユーザーネームは2文字〜20文字でお願いします。")
      .max(20, "ユーザーネームは2文字〜20文字でお願いします。"),
    email: z
      .string()
      .email("正しいメールアドレスではありません。"),
    schoolName: z
      .string()
      .min(1, "学校名を入力してください。"),
    admissionYear: z
      .number()
      .int()
      .min(1900, `入学年度は1900 ~ ${ thisYear }までで入力してください。`)
      .max(thisYear, `入学年度は1900 ~ ${ thisYear }までで入力してください。`),
    studentNumber: z
      .number()
      .int()
      .min(1101, "学籍番号は1101 ~ 3999で入力してください。")
      .max(3999, "学籍番号は1101 ~ 3999で入力してください。"),
  });
  return dataSchema.safeParse(data);
}

export function ValidateSubject(
  data: Subject
) {
  // バリデーション定義
  const dataSchema = z.object({
    subjectId: z
      .string()
      .min(1, "科目IDは1文字以上でお願いします。"),
    subjectName: z
      .string()
      .min(1, "科目名は1文字以上でお願いします。"),
    description: z
      .string(),
    isPublic: z
      .boolean(),
  });
  return dataSchema.safeParse(data);
}

export function ValidateUnit(
  data: Unit
) {
  const dataSchema = z.object({
    unitId: z
      .string()
      .min(1, "ユニットIDは1文字以上でお願いします。"),
    unitName: z
      .string()
      .min(1, "ユニット名は1文字以上でお願いします。"),
    description: z
      .string(),
    subjectId: z
      .string()
      .min(1, "科目IDは1文字以上でお願いします。"),
    isPublic: z
      .boolean(),
  });
  return dataSchema.safeParse(data);
}

export function ValidateLesson(
  data: Lesson
) {
  const dataSchema= z.object({
    lessonId: z
      .string()
      .min(1, "授業IDは1文字以上でお願いします。"),
    title: z
      .string()
      .min(1, "授業名は1文字以上でお願いします。"),
    description: z
      .string(),
    isPublic: z
      .boolean(),
    unitId: z
      .string()
      .min(1, "単元IDは1文字以上でお願いします。"),
  });
  return dataSchema.safeParse(data);
}

export function ValidateContent(
  data: Content
) {
  // バリデーション定義
  const dataSchema = z.object({
    contentId: z
      .string()
      .min(1, "コンテンツIDは1文字以上でお願いします。"),
    title: z
      .string()
      .min(1, "コンテンツ名は1文字以上でお願いします。"),
    description: z
      .string(),
    isPublic: z
      .boolean(),
    type: z
      .enum(["movie", "quiz", "other"]),
    url: z
      .string()
      .url("URLの形になっていません。")
  });
  return dataSchema.safeParse(data);
}

export function ValidateLessonContent(
  data: LessonContent
) {
  const dataSchema = z.object({
    lessonId: z
      .string()
      .min(1, "授業IDは1文字以上でお願いします。"),
    contentId: z
      .string()
      .min(1, "コンテンツIDは1文字以上でお願いします。"),
  });
  return dataSchema.safeParse(data);
}