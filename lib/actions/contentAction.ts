"use server";
import z from "zod";
import { OperationResult, Content, MessageContent } from "@/types/dbOperation";
import { createContent, editContent, deleteContent } from "@lib/dbController/content";
import { ValidateContent } from "@lib/validate";

export async function createContentAction(
  prevState: OperationResult<Content, MessageContent>,
  formData: FormData
): Promise<OperationResult<Content, MessageContent>> {
  const res:OperationResult<Content, MessageContent> = {
    isSuccess: false,
    values: {
      contentId: "",
      title: "",
      description: "",
      type: "",
      isPublic: false,
      url: "",
    },
    messages: {}
  };
  try {
    // データの取得と整形
    const rawData = {
      contentId: formData.get("content_id") as string,
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      isPublic: formData.get("is_public") as string,
      type: formData.get("type") as string,
      url: formData.get("url") as string,
    }
    const value:Content = {
      contentId: rawData.contentId,
      title: rawData.title,
      description: rawData.description,
      isPublic: rawData.isPublic == "true" ? true : false,
      type: rawData.type,
      url: rawData.url,
    }

    // バリデーション
    const validateFields = ValidateContent(value);
    if (!validateFields.success) {
      const errors = validateFields.error.flatten().fieldErrors;

      res.messages.contentId = errors.contentId ? errors.contentId.join(",") : undefined;
      res.messages.title = errors.title ? errors.title.join(",") : undefined;
      res.messages.description = errors.description ? errors.description.join(",") : undefined;
      res.messages.isPublic = errors.isPublic ? errors.isPublic.join(",") : undefined;
      res.messages.type = errors.type ? errors.type.join(",") : undefined;
      res.messages.url = errors.url ? errors.url.join(",") : undefined;

      res.values = value;
      return res;
    }

    // データベース登録
    const execValue = await createContent(
      validateFields.data.contentId,
      validateFields.data.title,
      validateFields.data.description,
      validateFields.data.type,
      validateFields.data.url,
      validateFields.data.isPublic,
    );
    // 返り値
    res.isSuccess = execValue.isSuccess;
    res.values = execValue.values;
    res.messages = execValue.messages;
    return res;
  } catch(error) {
    res.isSuccess = false;
    res.messages.other = String(error);
    return res;
  }
}

export async function editContentAction(
  prevState: OperationResult<Content, MessageContent>,
  formData: FormData
): Promise<OperationResult<Content, MessageContent>> {
  const res:OperationResult<Content, MessageContent> = {
    isSuccess: false,
    values: {
      contentId: "",
      title: "",
      description: "",
      type: "",
      isPublic: false,
      url: "",
    },
    messages: {
      other: "form(編集)"
    }
  };
  try {
    // データの取得と整形
    const rawData = {
      contentId: formData.get(`content_id${ prevState.values.contentId }`) as string,
      title: formData.get(`title${ prevState.values.contentId }`) as string,
      description: formData.get(`description${ prevState.values.contentId }`) as string,
      isPublic: formData.get(`is_public${ prevState.values.contentId }`) as string,
      type: formData.get(`type${ prevState.values.contentId }`) as string,
      url: formData.get(`url${ prevState.values.contentId }`) as string,
    }
    const value:Content = {
      contentId: rawData.contentId,
      title: rawData.title,
      description: rawData.description,
      isPublic: rawData.isPublic == "true" ? true : false,
      type: rawData.type,
      url: rawData.url,
    }

    // バリデーション
    const validateFields = ValidateContent(value);
    if (!validateFields.success) {
      const errors = validateFields.error.flatten().fieldErrors;

      res.messages.contentId = errors.contentId ? errors.contentId.join(",") : undefined;
      res.messages.title = errors.title ? errors.title.join(",") : undefined;
      res.messages.description = errors.description ? errors.description.join(",") : undefined;
      res.messages.isPublic = errors.isPublic ? errors.isPublic.join(",") : undefined;
      res.messages.type = errors.type ? errors.type.join(",") : undefined;
      res.messages.url = errors.url ? errors.url.join(",") : undefined;

      res.values = value;
      return res;
    }

    // データベース登録
    const execValue = await editContent({
      contentId: validateFields.data.contentId,
      title: validateFields.data.title,
      description: validateFields.data.description,
      type: validateFields.data.type,
      url: validateFields.data.url,
      isPublic: validateFields.data.isPublic,
    });
    // 返り値
    res.isSuccess = execValue.isSuccess;
    res.values = execValue.values;
    res.messages = execValue.messages;
    console.log(res);
    return res;
  } catch(error) {
    res.isSuccess = false;
    res.messages.other = String(error);
    return res;
  }
}

export async function deleteContentAction(
  prevState: OperationResult<Content, MessageContent>,
  formData: FormData
): Promise<OperationResult<Content, MessageContent>> {
  const res:OperationResult<Content, MessageContent> = {
    isSuccess: false,
    values: {
      contentId: "",
      title: "",
      description: "",
      type: "",
      isPublic: false,
      url: "",
    },
    messages: {
      other: "form(削除)"
    }
  };
  try {
    // データの取得と整形
    const rawData = {
      contentId: formData.get(`delete${ prevState.values.contentId }`) as string,
    }

    // バリデーション
    const dataSchema = z.string().min(1, "1文字以上です。");

    const result = dataSchema.safeParse(rawData.contentId);
    if (!result.success) {
      res.messages.other = result.error.format()._errors.join(", ");
      res.isSuccess = false;
      return res;
    }

    // データベース登録
    const execValue = await deleteContent(result.data);

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