"use server";
import { auth } from "@clerk/nextjs/server";
import { createUserWithStudent, editUserWithStudent } from "../dbController/user";
import { ValidateUserAndStudent } from "../validate";
import { OperationResult, UserAndStudent, MessageUserAndStudent } from "@/types/dbOperation";

export async function addUserAction(
  prevState: OperationResult, 
  formData:FormData
): Promise<OperationResult<UserAndStudent, MessageUserAndStudent>> {
  const res: OperationResult<UserAndStudent, MessageUserAndStudent> = {
    isSuccess: false,
    values: {
      userId: "",
      username: "",
      email: "",
      type: "student",
      schoolName: "",
      admissionYear: 0,
      studentNumber: 0,
    },
    messages: {
      other: "",
    }
  };
  try {
    // データ取得と整形
    const rawData = {
      username: formData.get("username") as string,
      email: formData.get("email") as string,
      type: "student",
      schoolName: formData.get("school_name") as string,
      admissionYear: Number(formData.get("admission_year") as string),
      studentNumber: Number(formData.get("student_number") as string),
    }
  
    // バリデーション実施
    const validateFields = ValidateUserAndStudent(rawData);
    
    // バリデーション失敗時の処理
    if (!validateFields.success) {
      const errors = validateFields.error.flatten().fieldErrors;
      res.messages.username = errors.username ? errors.username.join(", ") : undefined;
      res.messages.email = errors.email ? errors.email.join(", ") : undefined;
      res.messages.type = errors.type ? errors.type.join(", ") : undefined;
      res.messages.admissionYear = errors.admissionYear ? errors.admissionYear.join(", ") : undefined;
      res.messages.schoolName = errors.schoolName ? errors.schoolName.join(", ") : undefined;
      res.messages.studentNumber = errors.studentNumber ? errors.studentNumber.join(", ") : undefined;
      res.isSuccess = false;
      return res;
    }
    
    // 認証済みのユーザか確認
    const { userId } = await auth();
    if (!userId) {
      res.isSuccess = false;
      res.messages.other = "ユーザ認証でエラーが発生しました。ログインか登録を済ませてください。";
      return res;
    }
    // データベース登録処理
    const value = await createUserWithStudent(
      userId,
      validateFields.data.username,
      validateFields.data.email,
      validateFields.data.admissionYear,
      validateFields.data.schoolName,
      String(validateFields.data.studentNumber),
    )
    // 結果を返す
    res.isSuccess = value.isSuccess;
    res.messages = value.messages;
    res.values = value.values;
    return res;
  } catch (error) {
    // エラーハンドリング
    res.messages.other = String(error);
    return res;
  }
}

export async function editUserAction(
  prevState: OperationResult<UserAndStudent, MessageUserAndStudent>,
  formData: FormData
): Promise<OperationResult<UserAndStudent, MessageUserAndStudent>> {
  const res: OperationResult<UserAndStudent, MessageUserAndStudent> = {
    isSuccess: false,
    values: {
      userId: "",
      username: "",
      email: "",
      type: "student",
      schoolName: "",
      admissionYear: 0,
      studentNumber: 0,
    },
    messages: {
      other: "",
    }
  };
  try {
    // データ取得と整形
    const rawData = {
      userId: formData.get("user_id") as string,
      username: formData.get("username") as string,
      email: formData.get("email") as string,
      type: "student",
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
      res.messages = {
        username: errors.username ? errors.username.join(", ") : undefined,
        email: errors.email ? errors.email.join(", ") : undefined,
        type: errors.type ? errors.type.join(", ") : undefined,
        admissionYear: errors.admissionYear ? errors.admissionYear.join(", ") : undefined,
        schoolName: errors.schoolName ? errors.schoolName.join(", ") : undefined,
        studentNumber: errors.studentNumber ? errors.studentNumber.join(", ") : undefined,
      };
      res.values = rawData;
      res.isSuccess = false;
      return res;
    }
    // データベース登録処理
    const value = await editUserWithStudent(
      rawData.userId,
      validateFields.data.username,
      validateFields.data.email,
      validateFields.data.admissionYear,
      validateFields.data.schoolName,
      String(validateFields.data.studentNumber),
    )
    // 結果を返す
    res.isSuccess = value.isSuccess;
    res.values = value.values;
    res.messages = value.messages;
    return res;
  } catch (error) {
    // エラーハンドリング
    res.messages.other = String(error);
    return res;
  }
}