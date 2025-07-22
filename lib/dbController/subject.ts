"use server"
import { prisma } from '@lib/prisma';
import { Subject, MessageSubject, SubjectAndUnits, MessageSubjectAndUnits, OperationResult, UnitAndLessons, Lesson, SubjectWithUnitsForMypage, UnitWithLessonsForMypage, LessonWithContents, Content } from '@/types/dbOperation';

export async function getPublicSubjectsWithUnitsAndLessonsAndContents(

): Promise<OperationResult<SubjectWithUnitsForMypage[], MessageSubject>> {
  const res: OperationResult<SubjectWithUnitsForMypage[], MessageSubject> = {
    isSuccess: false,
    values: [],
    messages: {
      other: "公開科目一覧",
    }
  }
  try {
    const value = await prisma.subject.findMany({
      where: {
        is_public: true,
      },
      orderBy: {
        subject_id: 'asc'
      },
      include: {
        Units: {
          where: {
            is_public: true,
          },
          orderBy: {
            unit_id: 'asc'
          },
          include: {
            Lessons: {
              where: {
                is_public: true,
              },
              orderBy: {
                lesson_id: 'asc'
              },
              include: {
                Contents: {
                  where: {
                    Content: {
                      is_public: true,
                      type: {
                        in: ['movie', 'quiz'],
                      }
                    }
                  },
                  orderBy: {
                    content_id: 'asc',
                  },
                  include: {
                    Content: true
                  }
                }
              }
            }
          }
        }
      }
    });

    if (value.length == 0) {
      res.messages.other = "科目が見つかりません。";
      res.isSuccess = true;
      return res;
    }

    value.map(s => {
      const subject: SubjectWithUnitsForMypage = {
        subjectId: s.subject_id,
        subjectName: s.subject_name,
        description: s.description || "",
        isPublic: s.is_public,
        units: [],
      }

      s.Units.map(u => {
        const unit: UnitWithLessonsForMypage = {
          unitId: u.unit_id,
          unitName: u.unit_name,
          subjectId: u.subject_id,
          description: u.description || "",
          isPublic: u.is_public,
          lessons: [],
        }

        u.Lessons.map(l => {
          const lesson: LessonWithContents = {
            lessonId: l.lesson_id,
            title: l.title,
            description: l.description || "",
            isPublic: l.is_public,
            unitId: l.unit_id,
            contents: [],
          }

          l.Contents.map(c => {
            const content: Content = {
              contentId: c.Content.content_id,
              title: c.Content.title,
              description: c.Content.description || "",
              type: c.Content.type,
              isPublic: c.Content.is_public,
              url: c.Content.url,
            }
            lesson.contents.push(content)
          })
          unit.lessons.push(lesson)
        })
        subject.units.push(unit)
      })
      res.values.push(subject)
    });

    res.messages.other = "データを取得しました。";
    res.isSuccess = true;
    return res;
  } catch (error) {
    res.messages.other = String(error);
    return res;
  } finally {
    await prisma.$disconnect();
  }
}

export async function getSubject(
  subjectId: string
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
  };
  try {
    const value = await prisma.subject.findUnique({
      where: {
        subject_id: subjectId,
      }
    });
    if (value == null) {
      res.messages.other = "科目が見つかりません。";
      res.isSuccess = true;
      return res;
    }
    res.values = {
      subjectId: value.subject_id,
      subjectName: value.subject_name,
      description: value.description || "",
      isPublic: value.is_public,
    };
    res.messages.other = "科目を取得しました。";
    res.isSuccess = true;
    return res;
  } catch(error) {
    res.messages.other = String(error);
    return res;
  } finally {
    await prisma.$disconnect();
  }
}

export async function getSubjects(

): Promise<OperationResult<Subject[], MessageSubject>> {
  const res:OperationResult<Subject[], MessageSubject> = {
    isSuccess: false,
    values: [],
    messages: {
      other: "公開科目一覧",
    }
  }
  try {
    const value = await prisma.subject.findMany({
      orderBy: {
        subject_id: 'asc'
      }
    });
    if (value.length == 0) {
      res.messages.other = "科目が見つかりません。";
      res.isSuccess = true;
      return res;
    }
    value.map(v => {
      res.values.push({
        subjectId: v.subject_id,
        subjectName: v.subject_name,
        description: v.description || "",
        isPublic: v.is_public,
      });
    });
    res.messages.other = "科目を取得しました。";
    res.isSuccess = true;
    return res;
  } catch(error) {
    res.messages.other = String(error);
    return res;
  } finally {
    await prisma.$disconnect();
  }
}

export async function getPublicSubjects(

): Promise<OperationResult<Subject[], MessageSubject>> {
  const res:OperationResult<Subject[], MessageSubject> = {
    isSuccess: false,
    values: [],
    messages: {
      other: "公開科目一覧",
    }
  }
  try {
    const value = await prisma.subject.findMany({
      where: {
        is_public: true,
      }
    });
    if (value.length == 0) {
      res.messages.other = "科目が見つかりません。";
      res.isSuccess = true;
      return res;
    }
    value.map(v => {
      res.values.push({
        subjectId: v.subject_id,
        subjectName: v.subject_name,
        description: v.description || "",
        isPublic: v.is_public,
      })
    });
    res.messages.other = "データを取得しました。";
    res.isSuccess = true;
    return res;
  } catch(error) {
    res.messages.other = String(error);
    return res;
  } finally {
    await prisma.$disconnect();
  }
}

export async function getSubjectWithUnits(
  subjectId: string
):Promise<OperationResult<SubjectAndUnits, MessageSubjectAndUnits>> {
  const res:OperationResult<SubjectAndUnits, MessageSubjectAndUnits> = {
    isSuccess: false,
    values: {
      subjectId: "",
      subjectName: "",
      description: "",
      isPublic: false,
      units: [],
    },
    messages: {
      other: "",
    }
  };
  try {
    const value = await prisma.subject.findUnique({
      where: {
        subject_id: subjectId,
      },
      include: {
        Units: {
          include: {
            Lessons: {
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
    if (value == null) {
      res.messages.other = "科目が見つかりません。";
      res.isSuccess = true;
      return res;
    }
    res.values = {
      subjectId: value.subject_id,
      subjectName: value.subject_name,
      description: value.description || "",
      isPublic: value.is_public,
      units: [],
    }
    if (value.Units.length > 0) {
      value.Units.map(u => {
        const unit:UnitAndLessons = {
          unitId: u.unit_id,
          unitName: u.unit_name,
          subjectId: u.subject_id,
          description: u.description || "",
          isPublic: u.is_public,
          lessons: [],
        };
        if (u.Lessons.length > 0) {
          u.Lessons.map(l => {
            const lesson:Lesson = {
              lessonId: l.lesson_id,
              title: l.title,
              description: l.description || "",
              isPublic: l.is_public,
              unitId: l.unit_id,
            }
            unit.lessons.push(lesson);
          });
        }
        res.values.units.push(unit);
      });
    }
    res.messages.other = "科目を取得しました。";
    res.isSuccess = true;
    return res;
  } catch(error) {
    res.messages.other = String(error);
    return res;
  } finally {
    await prisma.$disconnect();
  }
}
export async function getSubjectWithPublicUnits(
  subjectId: string
):Promise<OperationResult<SubjectAndUnits, MessageSubjectAndUnits>> {
  const res:OperationResult<SubjectAndUnits, MessageSubjectAndUnits> = {
    isSuccess: false,
    values: {
      subjectId: "",
      subjectName: "",
      description: "",
      isPublic: false,
      units: [],
    },
    messages: {
      other: "",
    }
  };
  try {
    const value = await prisma.subject.findUnique({
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
    if (value == null) {
      res.messages.other = "科目が見つかりません。";
      res.isSuccess = true;
      return res;
    }
    res.values = {
      subjectId: value.subject_id,
      subjectName: value.subject_name,
      description: value.description || "",
      isPublic: value.is_public,
      units: [],
    }
    if (value.Units.length > 0) {
      value.Units.map(u => {
        const unit:UnitAndLessons = {
          unitId: u.unit_id,
          unitName: u.unit_name,
          subjectId: u.subject_id,
          description: u.description || "",
          isPublic: u.is_public,
          lessons: [],
        };
        if (u.Lessons.length > 0) {
          u.Lessons.map(l => {
            const lesson:Lesson = {
              lessonId: l.lesson_id,
              title: l.title,
              description: l.description || "",
              isPublic: l.is_public,
              unitId: l.unit_id,
            }
            unit.lessons.push(lesson);
          });
        }
        res.values.units.push(unit);
      });
    }
    res.messages.other = "科目を取得しました。";
    res.isSuccess = true;
    return res;
  } catch(error) {
    res.messages.other = String(error);
    return res;
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
):Promise<OperationResult<Subject, MessageSubject>> {
  const res:OperationResult<Subject, MessageSubject> = {
    isSuccess: false,
    values: {
      subjectId: "",
      subjectName: "",
      description: "",
      isPublic: false,
    },
    messages: {
      other: "科目の登録",
    }
  }
  try {
    const value = await prisma.subject.create({
      data: {
        subject_id: subjectId,
        subject_name: subjectName,
        description: description,
        is_public: isPublic,
      }
    });
    res.values = {
      subjectId: value.subject_id,
      subjectName: value.subject_name,
      description: value.description || "",
      isPublic: value.is_public,
    }
    res.messages.other = "登録に成功しました。";
    res.isSuccess = true;
    return res;
  } catch (error) {
    res.messages.other = String(error);
    return res;
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
):Promise<OperationResult<Subject, MessageSubject>>  {
  const res:OperationResult<Subject, MessageSubject> = {
    isSuccess: false,
    values: {
      subjectId: "",
      subjectName: "",
      description: "",
      isPublic: false,
    },
    messages: {
      other: "科目の更新",
    }
  }
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
    res.values = {
      subjectId: value.subject_id,
      subjectName: value.subject_name,
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

// 教科の削除
export async function deleteSubject(
  subjectId: string
):Promise<OperationResult<Subject, MessageSubject>> {
  const res:OperationResult<Subject, MessageSubject> = {
    isSuccess: false,
    values: {
      subjectId: "",
      subjectName: "",
      description: "",
      isPublic: false,
    },
    messages: {
      other: "科目の削除",
    }
  }
  try {
    const value = await prisma.subject.delete({
      where: {
        subject_id: subjectId
      }
    });
    res.values = {
      subjectId: value.subject_id,
      subjectName: value.subject_name,
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