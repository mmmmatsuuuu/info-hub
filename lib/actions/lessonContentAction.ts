"use server";
import { OperationResult, LessonContent, MessageLessonContent } from "@/types/dbOperation";
import { createLessonContent, deleteLessonContent } from "@lib/dbController/lessonContent";
import { ValidateLessonContent } from "@lib/validate";

export async function createLessonContentAction(
  prevState: OperationResult<LessonContent, MessageLessonContent>,
  formData: FormData
): Promise<OperationResult<LessonContent, MessageLessonContent>> {
  const res:OperationResult<LessonContent, MessageLessonContent> = {
    isSuccess: false,
    values: {
      lessonId: "",
      contentId: "",
    },
    messages: {
      other: "データ追加（LessonContent）"
    }
  }
  try {
    // データの取得と整形
    const rawData = {
      contentId: formData.get("content_id") as string,
      lessonId: formData.get("lesson_id") as string,
    }
    const value:LessonContent = {
      contentId: rawData.contentId,
      lessonId: rawData.lessonId,
    }

    // バリデーション
    const validateFields = ValidateLessonContent(value);
    if (!validateFields.success) {
      const errors = validateFields.error.flatten().fieldErrors;
      res.messages.contentId = errors.contentId ? errors.contentId.join(",") : undefined;
      res.messages.lessonId = errors.lessonId ? errors.lessonId.join(",") : undefined;

      res.values = value;
      return res;
    }

    // データベース登録
    const execValue = await createLessonContent(validateFields.data);

    // 返却
    res.isSuccess = execValue.isSuccess;
    res.values = execValue.values;
    res.messages = execValue.messages;
    return res;
  } catch (error) {
    res.isSuccess = false;
    res.messages.other = String(error);
    return res;
  }
}

export async function deleteLessonContentAction(
  prevState: OperationResult<LessonContent, MessageLessonContent>,
  formData: FormData
): Promise<OperationResult<LessonContent, MessageLessonContent>> {
  const res:OperationResult<LessonContent, MessageLessonContent> = {
    isSuccess: false,
    values: {
      lessonId: "",
      contentId: "",
    },
    messages: {
      other: "データ削除（LessonContent）"
    }
  }
  try {
    // データの取得と整形
    const rawData = {
      contentId: formData.get(`delete_content_id${ prevState.values.lessonId }-${ prevState.values.contentId }`) as string,
      lessonId: formData.get(`delete_lesson_id${ prevState.values.lessonId }-${ prevState.values.contentId }`) as string,
    }

    const value:LessonContent = {
      contentId: rawData.contentId,
      lessonId: rawData.lessonId,
    }

    // バリデーション
    const validateFields = ValidateLessonContent(value);
    if (!validateFields.success) {
      const errors = validateFields.error.flatten().fieldErrors;
      res.messages.contentId = errors.contentId ? errors.contentId.join(",") : undefined;
      res.messages.lessonId = errors.lessonId ? errors.lessonId.join(",") : undefined;

      res.values = value;
      return res;
    }

    // データベース登録
    const execValue = await deleteLessonContent(validateFields.data);

    // 返却
    res.isSuccess = execValue.isSuccess;
    res.values = execValue.values;
    res.messages = execValue.messages;
    return res;
  } catch (error) {
    res.isSuccess = false;
    res.messages.other = String(error);
    return res;
  }
}