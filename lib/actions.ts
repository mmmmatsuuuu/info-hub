"use server";
import { auth } from "@clerk/nextjs/server";
import z from "zod";
import { createUserWithStudent } from "./dbController";

type State = {
  error?: string| undefined;
  success: boolean;
  values?: any;
}

export async function addUserAction(prevState: State, formData:FormData): Promise<State> {
  try {
    const { userId } = await auth();
    if (!userId) {
      return {
        error: "認証されたユーザではありません。",
        success: false,
      }
    }
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const schoolName = formData.get("school_name") as string;
    const admissionYear = formData.get("admission_year") as string;
    const studentNumber = formData.get("student_number") as string;

    const usernameSchema = z
      .string()
      .min(2, "ユーザーネームは2文字〜10文字でお願いします。")
      .max(10, "ユーザーネームは2文字〜10文字でお願いします。");
    const emailSchema = z
      .string()
      .email("正しいメールアドレスではありません。");
    const schoolNameSchema = z
      .string()
      .min(1, "学校名を入力してください。");
    const admissionYearSchema = z
      .number()
      .int()
      .min(1900, "入学年度は1900 ~ 今年までで入力してください。")
      .max(new Date().getFullYear()+1, "入学年度は1900 ~ 今年までで入力してください。");
    const studentNumberSchema = z
      .number()
      .int()
      .min(1101, "学籍番号は1101 ~ 3999で入力してください。")
      .max(3999, "学籍番号は1101 ~ 3999で入力してください。");


    const validatedUsername = usernameSchema.parse(username);
    const validatedEmail = emailSchema.parse(email);
    const validdatedSchoolName = schoolNameSchema.parse(schoolName);
    const validatedAdmissonYear = admissionYearSchema.parse(Number(admissionYear));
    const validatedStudentNumber = studentNumberSchema.parse(Number(studentNumber));
  
    const res = await createUserWithStudent(
      userId,
      validatedUsername,
      validatedEmail,
      validatedAdmissonYear,
      validdatedSchoolName,
      String(validatedStudentNumber),
    );
    
    return res
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        error: error.errors.map((e) => e.message).join(", "),
        success: false,
      }
    } else if (error instanceof Error) {
      return {
        error: error.message,
        success: false,
      }        
    } else {
      return {
        error: "予期せぬエラーが発生しました。",
        success: false,
      }
    }
  }
}