"use server";
import { auth } from "@clerk/nextjs/server";
import { createUserWithStudent, editUserWithStudent } from "../dbController/user";
import { ValidateUserAndStudent } from "../validate";
import { FormState, UserAndStudent, MessageUserAndStudent } from "@/types/form";

export async function addUserAction(
  prevState: FormState, 
  formData:FormData
): Promise<FormState<UserAndStudent, MessageUserAndStudent>> {
  try {
    // データ取得と整形
    const rawData = {
      username: formData.get("username") as string,
      email: formData.get("email") as string,
      schoolName: formData.get("school_name") as string,
      admissionYear: Number(formData.get("admission_year") as string),
      studentNumber: Number(formData.get("student_number") as string),
    }
  
    // バリデーション実施
    const validateFields = ValidateUserAndStudent(rawData);
    
    // バリデーション失敗時の処理
    if (!validateFields.success) {
      const errors = validateFields.error.flatten().fieldErrors;
      return {
        messages: {
          username: errors.username ? errors.username.join(", ") : undefined,
          email: errors.email ? errors.email.join(", ") : undefined,
          admissionYear: errors.admissionYear ? errors.admissionYear.join(", ") : undefined,
          schoolName: errors.schoolName ? errors.schoolName.join(", ") : undefined,
          studentNumber: errors.studentNumber ? errors.studentNumber.join(", ") : undefined,
        },
        values: rawData,
        isSuccess: false,
      }
    }
    
    // 認証済みのユーザか確認
    const { userId } = await auth();
    if (!userId) {
      return {
        isSuccess: false,
        messages: {
          other: "ユーザ認証でエラーが発生しました。ログインか登録を済ませてください。"
        },
        values: {},
      }
    }
    // データベース登録処理
    const res = await createUserWithStudent(
      userId,
      validateFields.data.username,
      validateFields.data.email,
      validateFields.data.admissionYear,
      validateFields.data.schoolName,
      String(validateFields.data.studentNumber),
    )
    // 結果を返す
    return res;
  } catch (error) {
    // エラーハンドリング
    return {
      isSuccess: false,
      messages: {
        other: String(error),
      },
      values: {},
    }
  }
}

export async function editUserAction(
  prevState: FormState<UserAndStudent, MessageUserAndStudent>,
  formData: FormData
): Promise<FormState<UserAndStudent, MessageUserAndStudent>> {
  try {
    // データ取得と整形
    const rawData = {
      userId: formData.get("user_id") as string,
      username: formData.get("username") as string,
      email: formData.get("email") as string,
      schoolName: formData.get("school_name") as string,
      admissionYear: Number(formData.get("admission_year") as string),
      studentNumber: Number(formData.get("student_number") as string),
    }
    // バリデーション実施
    const validateFields = ValidateUserAndStudent(rawData);
    if (!rawData.userId) {
      return {
        messages: {
          userId: "userIdが定義されていません。",
        },
        values: rawData,
        isSuccess: false,
      }
    }
    // バリデーション失敗時の処理
    if (!validateFields.success) {
      const errors = validateFields.error.flatten().fieldErrors;
      return {
        messages: {
          username: errors.username ? errors.username.join(", ") : undefined,
          email: errors.email ? errors.email.join(", ") : undefined,
          admissionYear: errors.admissionYear ? errors.admissionYear.join(", ") : undefined,
          schoolName: errors.schoolName ? errors.schoolName.join(", ") : undefined,
          studentNumber: errors.studentNumber ? errors.studentNumber.join(", ") : undefined,
        },
        values: rawData,
        isSuccess: false,
      }
    }
    // データベース登録処理
    const res = await editUserWithStudent(
      rawData.userId,
      validateFields.data.username,
      validateFields.data.email,
      validateFields.data.admissionYear,
      validateFields.data.schoolName,
      String(validateFields.data.studentNumber),
    )
    console.log(res);
    // 結果を返す
    return {
      isSuccess: res.success,
      values: res.values,
      messages: {
        other: res.messages,
      },
    }
  } catch (error) {
    // エラーハンドリング
    return {
      isSuccess: false,
      messages: {
        other: String(error),
      },
      values: {},
    }
  }
}