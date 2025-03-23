"use server";
import z from "zod";
import { OperationResult, MessageSubject, Subject } from "@/types/dbOperation";
import { deleteSubject, createSubject, editSubject } from "@lib/dbController/subject";
import { ValidateSubject } from "@lib/validate";

export async function createSubjectAction(
  prevState: OperationResult<Subject, MessageSubject>,
  formData: FormData
):Promise<OperationResult<Subject, MessageSubject>> {
  const res:OperationResult<Subject, MessageSubject> = {
    isSuccess: false,
    values: {
      subjectId: "",
      subjectName: "",
      description: "",
      isPublic: false,
    },
    messages: {},
  }
  try {
    // データ取得と整形
    const rawData = {
      subjectId: formData.get("subject_id") as string,
      subjectName: formData.get("subject_name") as string,
      description: formData.get("description") as string,
      isPublic: formData.get("is_public") as string,
    }
  
    const value = {
      subjectId: rawData.subjectId,
      subjectName: rawData.subjectName,
      description: rawData.description,
      isPublic: rawData.isPublic == "true" ? true : false,
    }

    // バリデーションの実施
    const validateFields = ValidateSubject(value);

    if (!validateFields.success) {
      const errors = validateFields.error.flatten().fieldErrors;
      res.messages.subjectId = errors.subjectId ? errors.subjectId.join(",") : undefined;
      res.messages.subjectName = errors.subjectName ? errors.subjectName.join(",") : undefined;
      res.messages.description = errors.description ? errors.description.join(",") : undefined;
      res.messages.isPublic = errors.isPublic ? errors.isPublic.join(",") : undefined;

      res.values = value;

      return res;
    }

    // データベースへの登録処理
    const execValue = await createSubject(
      validateFields.data.subjectId,
      validateFields.data.subjectName,
      validateFields.data.description,
      validateFields.data.isPublic,
    );
  
    res.isSuccess = execValue.isSuccess;
    res.messages = execValue.messages;
    res.values = execValue.values;
    return res;
  } catch(error) {
    res.isSuccess = false;
    res.messages.other = String(error);
    return res;
  }
}

export async function editSubjectAction(
  prevState: OperationResult<Subject, MessageSubject>,
  formData: FormData
):Promise<OperationResult<Subject, MessageSubject>> {
  const res:OperationResult<Subject, MessageSubject> = {
    isSuccess: false,
    values: {
      subjectId: "",
      subjectName: "",
      description: "",
      isPublic: false,
    },
    messages: {},
  }
  try {
    // データ取得と整形
    const rawData = {
      subjectId: formData.get(`subject_id${ prevState.values.subjectId }`) as string,
      subjectName: formData.get(`subject_name${ prevState.values.subjectId }`) as string,
      description: formData.get(`description${ prevState.values.subjectId }`) as string,
      isPublic: formData.get(`is_public${ prevState.values.subjectId }`) as string,
    }
  
    const value = {
      subjectId: rawData.subjectId,
      subjectName: rawData.subjectName,
      description: rawData.description,
      isPublic: rawData.isPublic == "true" ? true : false,
    }

    // バリデーションの実施
    const validateFields = ValidateSubject(value);

    if (!validateFields.success) {
      const errors = validateFields.error.flatten().fieldErrors;
      res.messages.subjectId = errors.subjectId ? errors.subjectId.join(",") : undefined;
      res.messages.subjectName = errors.subjectName ? errors.subjectName.join(",") : undefined;
      res.messages.description = errors.description ? errors.description.join(",") : undefined;
      res.messages.isPublic = errors.isPublic ? errors.isPublic.join(",") : undefined;
      res.isSuccess = false;
      res.values = value;

      return res;
    }

    // データベースへの登録処理
    const execValue = await editSubject(
      validateFields.data.subjectId,
      validateFields.data.subjectName,
      validateFields.data.description,
      validateFields.data.isPublic,
    );
  
    res.isSuccess = execValue.isSuccess;
    res.messages = execValue.messages;
    res.values = execValue.values;
    return res;
  } catch(error) {
    res.isSuccess = false;
    res.messages.other = String(error);
    return res;
  }
}

export async function deleteSubjectAction(
  prevState: OperationResult<Subject, MessageSubject>,
  formData: FormData
): Promise<OperationResult<Subject, MessageSubject>> {
  const res:OperationResult<Subject, MessageSubject> = {
    isSuccess: false,
    values: {
      subjectId: "",
      subjectName: "",
      description: "",
      isPublic: false,
    },
    messages: {
      other: "",
    },
  }
  try {
    // データ整形
    const rawData = {
      subjectId: formData.get(`delete${ prevState.values.subjectId }`) as string,
    }

    // バリデーション
    const dataSchema = z.string().min(1, "1文字以上です。");

    // バリデーション失敗時の処理
    const result = dataSchema.safeParse(rawData.subjectId);
    if (!result.success) {
      res.messages.other = result.error.format()._errors.join(", ");
      res.values.subjectId = rawData.subjectId;
      return res;
    }

    // データベース処理
    const value = await deleteSubject(result.data);

    // 結果を返す
    res.values = value.values;
    res.messages = value.messages;
    res.isSuccess = value.isSuccess;
    return res;
  } catch (error) {
    // エラーハンドリング
    res.messages.other = String(error);
    return res;
  }
}