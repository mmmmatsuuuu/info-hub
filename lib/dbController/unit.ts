import { prisma } from '@lib/prisma';
import { Prisma } from '@prisma/client';
import { Unit, MessageUnit, FormState } from '@/types/form';

export async function getUnit(unitId: string) {
  try {
    return await prisma.unit.findUnique({
      where: {
        unit_id: unitId,
      }
    });
  } finally {
    await prisma.$disconnect();
  }
}

export async function getUnits() {
  try {
    return await prisma.unit.findMany({});
  } finally {
    await prisma.$disconnect();
  }
}

type UnitPreview = Prisma.UnitGetPayload<{
  include: {
    Lessons: {
    }
  }
}>
type UnitWithLessonType = FormState<UnitPreview | null, any>;

export async function getUnitWithLessons(
  unitId: string
): Promise<UnitWithLessonType> {
  const rtn:UnitWithLessonType = {
    isSuccess: false,
    values: null,
    messages: {
      other: "",
    },
  }
  try {
    const unit = await prisma.unit.findUnique({
      where: {
        unit_id: unitId
      },
      include: {
        Lessons: {
        }
      }
    });
    if (!unit) {
      rtn.messages = "データが取得できませんでした。";
      return rtn;
    }
    rtn.values = unit;
    rtn.isSuccess = true;
    rtn.messages = "データの取得に成功しました。";
    return rtn;
  } catch (error) {
    rtn.messages = String(error);
    return rtn;
  } finally {
    await prisma.$disconnect();
  }
} 



// 新規作成
export async function createUnit(
  unitId: string,
  unitName: string,
  subjectId: string,
  description: string,
  isPublic: boolean,
):Promise<FormState<Unit, MessageUnit>> {
  const res:FormState<Unit, MessageUnit> = {
    isSuccess: false,
    values: {
      unitId: "",
      unitName: "",
      subjectId: "",
      description: "",
      isPublic: false,
    },
    messages: {
      other: "これはdbController(単元作成)"
    },
  }
  try {
    const value = await prisma.unit.create({
      data: {
        unit_id: unitId,
        unit_name: unitName,
        subject_id: subjectId,
        description: description,
        is_public: isPublic,
      }
    });
    res.values = {
      unitId: value.unit_id,
      unitName: value.unit_name,
      subjectId: value.subject_id,
      description: value.description || "",
      isPublic: value.is_public,
    }
    res.isSuccess = true;
    res.messages.other = "登録に成功しました。";
    return res;
  } catch (error) {
    res.messages.other = String(error);
    return res;
  } finally {
    await prisma.$disconnect();
  }
}
// 編集
export async function editUnit(unit: Unit):Promise<FormState<Unit, MessageUnit>> {
  const res:FormState<Unit, MessageUnit> = {
    isSuccess: false,
    values: unit,
    messages: {
      other: "これはdbController(単元編集)"
    },
  }
  try {
    const value = await prisma.unit.update({
      where: {
        unit_id: unit.unitId,
      },
      data: {
        unit_name: unit.unitName,
        description: unit.description,
        subject_id: unit.subjectId,
        is_public: unit.isPublic, 
      }
    });
    res.values = {
      unitId: value.unit_id,
      unitName: value.unit_name,
      subjectId: value.subject_id,
      description: value.description || "",
      isPublic: value.is_public,
    }
    res.isSuccess = true;
    res.messages.other = "更新に成功しました。";
    return res;
  } catch (error) {
    res.messages.other = String(error);
    return res;
  } finally {
    await prisma.$disconnect();
  }
}

// 削除
export async function deleteUnit(
  unitId: string
):Promise<FormState<Unit, MessageUnit>> {
  const res:FormState<Unit, MessageUnit> = {
    isSuccess: false,
    values: {
      unitId: "",
      unitName: "",
      subjectId: "",
      description: "",
      isPublic: false,
    },
    messages: {
      other: "これはdbController(単元削除)"
    },
  }
  try {
    const value = await prisma.unit.delete({
      where: {
        unit_id: unitId,
      }
    });
    res.values = {
      unitId: value.unit_id,
      unitName: value.unit_name,
      subjectId: value.subject_id,
      description: value.description || "",
      isPublic: value.is_public,
    }
    res.isSuccess = true;
    res.messages.other = "削除に成功しました。";
    return res;
  } catch (error) {
    res.messages.other = String(error);
    return res;
  } finally {
    await prisma.$disconnect();
  }
}