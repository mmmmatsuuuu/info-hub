import { z } from "@node_modules/zod";
import { UserAndStudent } from "@/types/form";

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