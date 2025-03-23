"use server";
import { z } from "@node_modules/zod";
import { OperationResult, Unit, MessageUnit } from "@/types/dbOperation";
import { createUnit, editUnit, deleteUnit } from "@lib/dbController/unit";
import { ValidateUnit } from "@lib/validate";

export async function createUnitAction(
  prevState: OperationResult<Unit, MessageUnit>,
  formData: FormData
): Promise<OperationResult<Unit, MessageUnit>> {
  const res:OperationResult<Unit, MessageUnit> = {
    isSuccess: false,
    values: {
      unitId: "",
      unitName: "",
      subjectId: "",
      description: "",
      isPublic: false,
    },
    messages: {
      other: "form(新規作成)"
    }
  };
  try {
    // データの取得と整形
    const rawData = {
      unitId: formData.get("unit_id") as string,
      unitName: formData.get("unit_name") as string,
      subjectId: formData.get("subject_id") as string,
      description: formData.get("description") as string,
      isPublic: formData.get("is_public") as string,
    }

    const value:Unit = {
      unitId: rawData.unitId,
      unitName: rawData.unitName,
      subjectId: rawData.subjectId,
      description: rawData.description,
      isPublic: rawData.isPublic == "true" ? true : false,
    }

    // バリデーション
    const validateFields = ValidateUnit(value);
    if (!validateFields.success) {
      const errors = validateFields.error.flatten().fieldErrors;

      res.messages.unitId = errors.unitId ? errors.unitId.join(",") : undefined;
      res.messages.unitName = errors.unitName ? errors.unitName.join(",") : undefined;
      res.messages.subjectId = errors.subjectId ? errors.subjectId.join(",") : undefined;
      res.messages.description = errors.description ? errors.description.join(",") : undefined;
      res.messages.isPublic = errors.isPublic ? errors.isPublic.join(",") : undefined;

      res.values = value;
      return res;
    }

    // データベース登録
    const execValue = await createUnit(
      validateFields.data.unitId,
      validateFields.data.unitName,
      validateFields.data.subjectId,
      validateFields.data.description,
      validateFields.data.isPublic,
    );
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

export async function editUnitAction(
  prevState: OperationResult<Unit, MessageUnit>,
  formData: FormData
): Promise<OperationResult<Unit, MessageUnit>> {
  const res:OperationResult<Unit, MessageUnit> = {
    isSuccess: false,
    values: {
      unitId: "",
      unitName: "",
      subjectId: "",
      description: "",
      isPublic: false,
    },
    messages: {
      other: "form(編集)"
    }
  };
  try {
    // データの取得と整形
    const rawData = {
      unitId: formData.get(`unit_id${ prevState.values.unitId }`) as string,
      unitName: formData.get(`unit_name${ prevState.values.unitId }`) as string,
      subjectId: formData.get(`subject_id${ prevState.values.unitId }`) as string,
      description: formData.get(`description${ prevState.values.unitId }`) as string,
      isPublic: formData.get(`is_public${ prevState.values.unitId }`) as string,
    }

    const value:Unit = {
      unitId: rawData.unitId,
      unitName: rawData.unitName,
      subjectId: rawData.subjectId,
      description: rawData.description,
      isPublic: rawData.isPublic == "true" ? true : false,
    }

    // バリデーション
    const validateFields = ValidateUnit(value);
    if (!validateFields.success) {
      const errors = validateFields.error.flatten().fieldErrors;

      res.messages.unitId = errors.unitId ? errors.unitId.join(",") : undefined;
      res.messages.unitName = errors.unitName ? errors.unitName.join(",") : undefined;
      res.messages.subjectId = errors.subjectId ? errors.subjectId.join(",") : undefined;
      res.messages.description = errors.description ? errors.description.join(",") : undefined;
      res.messages.isPublic = errors.isPublic ? errors.isPublic.join(",") : undefined;

      res.values = value;
      return res;
    }

    // データベース登録
    const execValue = await editUnit(
      validateFields.data
    );
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

export async function deleteUnitAction(
  prevState: OperationResult<Unit, MessageUnit>,
  formData: FormData
): Promise<OperationResult<Unit, MessageUnit>> {
  const res:OperationResult<Unit, MessageUnit> = {
    isSuccess: false,
    values: {
      unitId: "",
      unitName: "",
      subjectId: "",
      description: "",
      isPublic: false,
    },
    messages: {
      other: "form(削除)"
    }
  };
  try {
    // データの取得と整形
    const rawData = {
      unitId: formData.get(`delete${ prevState.values.unitId }`) as string,
    }

    // バリデーション
    const dataSchema = z.string().min(1, "1文字以上です。");

    const result = dataSchema.safeParse(rawData.unitId);
    if (!result.success) {
      res.messages.other = result.error.format()._errors.join(", ");
      res.isSuccess = false;
      return res;
    }

    // データベース登録
    const execValue = await deleteUnit(result.data);

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