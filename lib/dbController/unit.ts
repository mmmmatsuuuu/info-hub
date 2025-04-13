"use server"
import { prisma } from '@lib/prisma';
import { Unit, MessageUnit, UnitAndLessons, MessageUnitAndLessons, OperationResult } from '@/types/dbOperation';

export async function getUnit(
  unitId: string
) :Promise<OperationResult<Unit, MessageUnit>> {
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
      other: "単元の取得",
    },
  };
  try {
    const value = await prisma.unit.findUnique({
      where: {
        unit_id: unitId,
      }
    });
    if (value == null) {
      res.messages.other = "単元が見つかりません。";
      res.isSuccess = true;
      return res;
    }
    res.values = {
      unitId: value.unit_id,
      unitName: value.unit_name,
      subjectId: value.subject_id,
      description: value.description || "",
      isPublic: value.is_public,
    };
    res.messages.other = "単元を取得しました。";
    res.isSuccess = true;
    return res;
  } catch (error) {
    res.messages.other = String(error);
    return res;
  } finally {
    await prisma.$disconnect();
  }
}

export async function getUnits(

) :Promise<OperationResult<Unit[], MessageUnit>> {
  const res:OperationResult<Unit[], MessageUnit> = {
    isSuccess: false,
    values: [],
    messages: {
      other: "単元の取得",
    },
  };
  try {
    const value = await prisma.unit.findMany({});
    if (value.length == 0) {
      res.messages.other = "単元が見つかりません。";
      res.isSuccess = true;
      return res;
    }
    value.map(v => {
      res.values.push({
        unitId: v.unit_id,
        unitName: v.unit_name,
        subjectId: v.subject_id,
        description: v.description || "",
        isPublic: v.is_public,
      })
    });
    res.messages.other = "取得しました。";
    res.isSuccess = true;
    return res;
  } catch (error) {
    res.messages.other = String(error);
    return res;
  } finally {
    await prisma.$disconnect();
  }
}

export async function getUnitWithLessons(
  unitId: string
): Promise<OperationResult<UnitAndLessons, MessageUnitAndLessons>> {
  const res:OperationResult<UnitAndLessons, MessageUnitAndLessons> = {
    isSuccess: false,
    values: {
      unitId: "",
      unitName: "",
      subjectId: "",
      description: "",
      isPublic: false,
      lessons: [],
    },
    messages: {
      other: "授業データ込みの単元を取得",
    },
  };
  try {
    const value = await prisma.unit.findUnique({
      where: {
        unit_id: unitId
      },
      include: {
        Lessons: {
        }
      }
    });
    if (value == null) {
      res.messages.other = "単元が見つかりません。";
      res.isSuccess = true;
      return res;
    }
    res.values = {
      unitId: value.unit_id,
      unitName: value.unit_name,
      subjectId: value.subject_id,
      description: value.description || "",
      isPublic: value.is_public,
      lessons: [],
    }
    if (value.Lessons.length > 0) {
      value.Lessons.map(l => {
        res.values.lessons.push({
          lessonId: l.lesson_id,
          title: l.title,
          description: l.description || "",
          isPublic: l.is_public,
          unitId: l.unit_id,
        });
      });
    }
    res.messages.other = "単元を取得しました";
    res.isSuccess = true;
    return res;
  } catch (error) {
    res.messages.other = String(error);
    return res;
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
) :Promise<OperationResult<Unit, MessageUnit>> {
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
      other: "単元の取得",
    },
  };
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
export async function editUnit(
  unit: Unit
) :Promise<OperationResult<Unit, MessageUnit>> {
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
      other: "単元の取得",
    },
  };
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
    res.messages.other = "更新に成功しました。";
    res.isSuccess = true;
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
) :Promise<OperationResult<Unit, MessageUnit>> {
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
      other: "単元の取得",
    },
  };
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
    res.messages.other = "削除に成功しました。";
    res.isSuccess = true;
    return res;
  } catch (error) {
    res.messages.other = String(error);
    return res;
  } finally {
    await prisma.$disconnect();
  }
}