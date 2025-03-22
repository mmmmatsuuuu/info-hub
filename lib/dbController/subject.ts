import { prisma } from '@lib/prisma';
import { Subject, MessageSubject, FormState } from '@/types/form';

export async function getSubject(subjectId: string) {
  try {
    return await prisma.subject.findUnique({
      where: {
        subject_id: subjectId,
      }
    });
  } finally {
    await prisma.$disconnect();
  }
}

export async function getSubjects() {
  try {
    return await prisma.subject.findMany({
      orderBy: {
        subject_id: 'asc'
      }
    });
  } finally {
    await prisma.$disconnect();
  }
}

export async function getPublicSubjects(): Promise<FormState<Subject[], MessageSubject>> {
  const res:FormState<Subject[], MessageSubject> = {
    isSuccess: false,
    values: [],
    messages: {
      other: "公開科目一覧",
    }
  }
  try {
    const subjects:Subject[] = [];
    const datas = await prisma.subject.findMany({
      where: {
        is_public: true,
      }
    });
    if (datas) {
      datas.map(d => {
        subjects.push({
          subjectId: d.subject_id,
          subjectName: d.subject_name,
          description: d.description || "",
          isPublic: d.is_public,
        })
      });
      res.isSuccess = true;
      res.values = subjects;
      res.messages.other = "データを取得しました。";
    } else {
      res.messages.other = "データの取得に失敗しました。";
    }
    return res;
  } catch(error) {
    res.messages.other = String(error);
    return res;
  } finally {
    await prisma.$disconnect();
  }
}

export async function getSubjectWithUnits(subjectId: string) {
  try {
    return await prisma.subject.findUnique({
      where: {
        subject_id: subjectId,
      },
      include: {
        Units: {
          include: {
            Lessons: {
              select: {
                lesson_id: true,
                title: true,
              },
              orderBy: {
                lesson_id: 'asc'
              }
            }
          },
          orderBy: {
            unit_id: 'asc'
          }
        },
      },
    });
  } finally {
    await prisma.$disconnect();
  }
}
export async function getSubjectWithPublicUnits(subjectId: string) {
  try {
    return await prisma.subject.findUnique({
      where: {
        subject_id: subjectId,
      },
      include: {
        Units: {
          where: {
            is_public: true,
          },
          include: {
            Lessons: {
              where: {
                is_public: true,
              },
              select: {
                lesson_id: true,
                title: true,
              },
              orderBy: {
                lesson_id: 'asc'
              }
            }
          },
          orderBy: {
            unit_id: 'asc'
          }
        },
      },
    });
  } finally {
    await prisma.$disconnect();
  }
}

// 教科の追加
export async function createSubject(
  subjectId:string,
  subjectName: string, 
  description: string,
  isPublic: boolean,
):Promise<FormState<Subject, MessageSubject>> {
  try {
    const value = await prisma.subject.create({
      data: {
        subject_id: subjectId,
        subject_name: subjectName,
        description: description,
        is_public: isPublic,
      }
    });
    return {
      isSuccess: true,
      values: {
        subjectId: value.subject_id,
        subjectName: value.subject_name,
        description: value.description || "",
        isPublic: value.is_public
      },
      messages: {
        other: "登録に成功しました。",
      }
    }
  } catch (error) {
    return {
      isSuccess: false,
      values: {
        subjectId: subjectId,
        subjectName: subjectName,
        description: description,
        isPublic: isPublic
      },
      messages: {
        other: String(error),
      }
    }
  } finally {
    await prisma.$disconnect();
  }
}

// 教科の編集
export async function editSubject(
  subjectId: string, 
  subjectName: string, 
  description: string,
  isPublic: boolean,
):Promise<FormState<Subject, MessageSubject>>  {
  try {
    const value = await prisma.subject.update({
      where: {
        subject_id: subjectId,
      },
      data: {
        subject_name: subjectName,
        description: description,
        is_public: isPublic,
      }
    });
    return {
      isSuccess: true,
      values: {
        subjectId: value.subject_id,
        subjectName: value.subject_name,
        description: value.description || "",
        isPublic: value.is_public
      },
      messages: {
        other: "登録に成功しました。",
      }
    }
  } catch (error) {
    return {
      isSuccess: false,
      values: {
        subjectId: subjectId,
        subjectName: subjectName,
        description: description,
        isPublic: isPublic
      },
      messages: {
        other: String(error),
      }
    }
  } finally {
    await prisma.$disconnect();
  }
}

// 教科の削除
export async function deleteSubject(subjectId: string) {
  try {
    const data = await prisma.subject.delete({
      where: {
        subject_id: subjectId
      }
    });
    return {
      success: true,
      messages: {
        other: "削除に成功しました。"
      },
      values: data,
    }
  } catch (error) {
    return {
      success: false,
      messages: {
        other: String(error)
      },
      values: {},
    }
  } finally {
    await prisma.$disconnect();
  }
}