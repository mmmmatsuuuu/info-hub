"use server";
import z from "zod";
import { ValidateLesson } from "@lib/validate";
import { FormState, Lesson, MessageLesson } from "@/types/form";
import { createLesson, editLesson, deleteLesson } from "@lib/dbController/lesson";

export async function createLessonAction(
  prevState: FormState<Lesson, MessageLesson>,
  formData: FormData
): Promise<FormState<Lesson, MessageLesson>> {
  const res:FormState<Lesson, MessageLesson> = {
    isSuccess: false,
    values: {
      lessonId: "",
      title: "",
      description: "",
      isPublic: false,
      unitId: "",
    },
    messages: {
      other: "form(新規作成)"
    }
  };
  try {
    // データの取得と整形
    const rawData = {
      lessonId: formData.get("lesson_id") as string,
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      isPublic: formData.get("is_public") as string,
      unitId: formData.get("unit_id") as string,
    }

    const value:Lesson = {
      lessonId: rawData.lessonId,
      title: rawData.title,
      description: rawData.description,
      isPublic: rawData.isPublic == "true" ? true : false,
      unitId: rawData.unitId,
    }
    // バリデーション
    const validateFields = ValidateLesson(value);
    if (!validateFields.success) {
      const errors = validateFields.error.flatten().fieldErrors;

      res.messages.lessonId = errors.lessonId ? errors.lessonId.join(",") : undefined;
      res.messages.title = errors.title ? errors.title.join(",") : undefined;
      res.messages.description = errors.description ? errors.description.join(",") : undefined;
      res.messages.isPublic = errors.isPublic ? errors.isPublic.join(",") : undefined;
      res.messages.unitId = errors.unitId ? errors.unitId.join(",") : undefined;

      res.values = value;
      return res;
    }

    // データベース登録
    const execValue = await createLesson(
      validateFields.data.lessonId,
      validateFields.data.title,
      validateFields.data.description,
      validateFields.data.isPublic,
      validateFields.data.unitId,
    )

    // 返り値
    res.isSuccess = execValue.isSuccess;
    res.values = execValue.values;
    res.messages = execValue.messages;
    return res;
  } catch(error) {
    res.messages.other = String(error);
    return res;
  }
}

export async function editLessonAction(
  prevState: FormState<Lesson, MessageLesson>,
  formData: FormData
): Promise<FormState<Lesson, MessageLesson>> {
  const res:FormState<Lesson, MessageLesson> = {
    isSuccess: false,
    values: {
      lessonId: "",
      title: "",
      description: "",
      isPublic: false,
      unitId: "",
    },
    messages: {
      other: "form(編集)"
    }
  };
  try {
    // データの取得と整形
    const rawData = {
      lessonId: formData.get(`lesson_id${ prevState.values.lessonId }`) as string,
      title: formData.get(`title${ prevState.values.lessonId }`) as string,
      description: formData.get(`description${ prevState.values.lessonId }`) as string,
      isPublic: formData.get(`is_public${ prevState.values.lessonId }`) as string,
      unitId: formData.get(`unit_id${ prevState.values.lessonId }`) as string,
    }

    const value:Lesson = {
      lessonId: rawData.lessonId,
      title: rawData.title,
      description: rawData.description,
      isPublic: rawData.isPublic == "true" ? true : false,
      unitId: rawData.unitId,
    }
    // バリデーション
    const validateFields = ValidateLesson(value);
    if (!validateFields.success) {
      const errors = validateFields.error.flatten().fieldErrors;

      res.messages.lessonId = errors.lessonId ? errors.lessonId.join(",") : undefined;
      res.messages.title = errors.title ? errors.title.join(",") : undefined;
      res.messages.description = errors.description ? errors.description.join(",") : undefined;
      res.messages.isPublic = errors.isPublic ? errors.isPublic.join(",") : undefined;
      res.messages.unitId = errors.unitId ? errors.unitId.join(",") : undefined;

      res.values = value;
      return res;
    }

    // データベース登録
    const execValue = await editLesson(
      validateFields.data
    )

    // 返り値
    res.isSuccess = execValue.isSuccess;
    res.values = execValue.values;
    res.messages = execValue.messages;
    return res;
  } catch(error) {
    res.messages.other = String(error);
    return res;
  }
}

export async function deleteLessonAction(
  prevState: FormState<Lesson, MessageLesson>,
  formData: FormData
): Promise<FormState<Lesson, MessageLesson>> {
  const res:FormState<Lesson, MessageLesson> = {
    isSuccess: false,
    values: {
      lessonId: "",
      title: "",
      description: "",
      isPublic: false,
      unitId: "",
    },
    messages: {
      other: "form(削除)"
    }
  };
  try {
    // データの取得と整形
    const rawData = {
      lessonId: formData.get(`delete${ prevState.values.lessonId }`) as string,
    }

    console.log(rawData);

    // バリデーション
    const dataSchema = z.string().min(1, "1文字以上です。");

    const result = dataSchema.safeParse(rawData.lessonId);
    if (!result.success) {
      res.messages.other = result.error.format()._errors.join(", ");
      res.isSuccess = false;
      return res;
    }

    // データベース登録
    const execValue = await deleteLesson(result.data);

    // 返り値
    res.isSuccess = execValue.isSuccess;
    res.values = execValue.values;
    res.messages = execValue.messages;
    return res;
  } catch(error) {
    res.messages.other = String(error);
    return res;
  }
}