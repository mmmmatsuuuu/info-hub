"use server";
import { auth } from "@clerk/nextjs/server";
import z from "zod";
import { createUserWithStudent } from "./dbController";

type State = {
  errors?: any;
  success: boolean;
  values?: any;
  message?: string;
}

export async function addUserAction(
  prevState: State, 
  formData:FormData
): Promise<State> {
  try {
    const thisYear = new Date().getFullYear()+1;
    const dataSchema = z.object({
      username: z
      .string()
      .min(2, "ユーザーネームは2文字〜10文字でお願いします。")
      .max(10, "ユーザーネームは2文字〜10文字でお願いします。"),
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
  
    const rawData = {
      username: formData.get("username") as string,
      email: formData.get("email") as string,
      schoolName: formData.get("school_name") as string,
      admissionYear: Number(formData.get("admission_year") as string),
      studentNumber: Number(formData.get("student_number") as string),
    }
  
    const validateFields = dataSchema.safeParse(rawData);

    
    if (!validateFields.success) {
      return {
        errors: validateFields.error.flatten().fieldErrors,
        values: rawData,
        success: false,
        message: "入力内容に問題があります。",
      }
    }
    
    const { userId } = await auth();
    if (!userId) {
      return {
        success: false,
        errors: {
          other: "ユーザ認証でエラーが発生しました。",
        },
        message: "ログインか登録を済ませてください。",
      }
    }
    const res = await createUserWithStudent(
      userId,
      validateFields.data.username,
      validateFields.data.email,
      validateFields.data.admissionYear,
      validateFields.data.schoolName,
      String(validateFields.data.studentNumber),
    )
    return {
      success: res.success,
      errors: {
        other: String(res.error),
      },
      values: res.values,
      message: "登録に成功しました。",
    }
  } catch (error) {
    return {
      success: false,
      errors: {
        other: String(error),
      },
      message: "予期せぬエラー",
    }
  }
}