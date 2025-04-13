"use server"
import { prisma } from '@lib/prisma';
import { Lesson, MessageLesson, LessonAndContents, MessageLessonAndContents, Content, OperationResult } from '@/types/dbOperation';

export async function getSimpleLesson(lessonId: string) {
  try {
    return await prisma.lesson.findUnique({
      where: {
        lesson_id: lessonId,
      }
    });
  } finally {
    await prisma.$disconnect();
  }
}

export async function getLesson(
  lessonId: string
): Promise<OperationResult<LessonAndContents, MessageLessonAndContents>> {
  const res:OperationResult<LessonAndContents, MessageLessonAndContents> = {
    isSuccess: false,
    values: {
      unit_id: "",
      title: "",
      description: "",
      lesson_id: "",
      is_public: false,
      movies: [],
      quiz: [],
      others: [],
    },
    messages: {
      other: ""
    },
  };
  try {
    const movies:Content[] = [];
    const quiz:Content[] = [];
    const others:Content[] = [];
    const lesson = await prisma.lesson.findUnique({
      where: {
        lesson_id: lessonId
      },
      include: {
        Contents: {
          where: {
            lesson_id: lessonId
          },
          orderBy: {
            content_id: "asc"
          }
        },
      }
    });
    if (!lesson) {
      res.messages.other = "授業が見つかりません。";
      res.isSuccess = true;
      return res;
    }
  
    for (let i = 0; i < lesson.Contents.length; i++) {
      const content = await prisma.content.findUnique({
        where: {
          content_id: lesson.Contents[i].content_id
        }
      });
      if (content) {
        switch (content.type) {
          case "movie":
            movies.push({
              contentId: content.content_id,
              title: content.title,
              description: content.description || "",
              type: content.type,
              isPublic: content.is_public,
              url: content.url,
            });
            break;
          case "quiz":
            quiz.push({
              contentId: content.content_id,
              title: content.title,
              description: content.description || "",
              type: content.type,
              isPublic: content.is_public,
              url: content.url,
            });
            break;
          default:
            others.push({
              contentId: content.content_id,
              title: content.title,
              description: content.description || "",
              type: content.type,
              isPublic: content.is_public,
              url: content.url,
            });
            break;
        }
      }
    }
    res.values = {
      unit_id: lesson.unit_id,
      description: lesson.description || "",
      is_public: lesson.is_public,
      lesson_id: lesson.lesson_id,
      title: lesson.title,
      movies: movies,
      quiz: quiz,
      others: others,
    }
     res.messages.other = "授業を取得しました。";
    res.isSuccess = true;
    return res;
  } catch (error) {
    res.messages.other = String(error);
    return res;
  } finally {
    await prisma.$disconnect();
  }
}
export async function getPublicLesson(
  lessonId: string
): Promise<OperationResult<LessonAndContents, MessageLessonAndContents>> {
  const res:OperationResult<LessonAndContents, MessageLessonAndContents> = {
    isSuccess: false,
    values: {
      unit_id: "",
      title: "",
      description: "",
      lesson_id: "",
      is_public: false,
      movies: [],
      quiz: [],
      others: [],
    },
    messages: {
      other: ""
    },
  };
  try {
    const movies:Content[] = [];
    const quiz:Content[] = [];
    const others:Content[] = [];
    const lesson = await prisma.lesson.findUnique({
      where: {
        lesson_id: lessonId
      },
      include: {
        Contents: {
          where: {
            lesson_id: lessonId,
          },
          orderBy: {
            content_id: "asc"
          }
        },
      }
    });
    if (!lesson) {
      res.messages.other = "授業が見つかりません。";
      res.isSuccess = true;
      return res;
    }
  
    for (let i = 0; i < lesson.Contents.length; i++) {
      const content = await prisma.content.findUnique({
        where: {
          content_id: lesson.Contents[i].content_id,
          is_public: true,
        }
      });
      if (content) {
        switch (content.type) {
          case "movie":
            movies.push({
              contentId: content.content_id,
              title: content.title,
              description: content.description || "",
              type: content.type,
              isPublic: content.is_public,
              url: content.url,
            });
            break;
          case "quiz":
            quiz.push({
              contentId: content.content_id,
              title: content.title,
              description: content.description || "",
              type: content.type,
              isPublic: content.is_public,
              url: content.url,
            });
            break;
          default:
            others.push({
              contentId: content.content_id,
              title: content.title,
              description: content.description || "",
              type: content.type,
              isPublic: content.is_public,
              url: content.url,
            });
            break;
        }
      }
    }
    res.values = {
      unit_id: lesson.unit_id,
      description: lesson.description || "",
      is_public: lesson.is_public,
      lesson_id: lesson.lesson_id,
      title: lesson.title,
      movies: movies,
      quiz: quiz,
      others: others,
    }
    res.messages.other = "授業を取得しました。";
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
export async function createLesson(
  lessonId: string,
  title: string,
  description: string,
  isPublic: boolean,
  unitId: string,
):Promise<OperationResult<Lesson, MessageLesson>> {
  const res:OperationResult<Lesson, MessageLesson> = {
    isSuccess: false,
    values: {
      lessonId: "",
      title: "",
      description: "",
      isPublic: false,
      unitId: "",
    },
    messages: {
      other: "これはdbController(単元作成)"
    },
  }
  try {
    const value = await prisma.lesson.create({
      data: {
        lesson_id: lessonId,
        title: title,
        description: description,
        is_public: isPublic,
        unit_id: unitId,
      }
    });
    res.values = {
      lessonId: value.lesson_id,
      title: value.title,
      description: value.description || "",
      isPublic: value.is_public,
      unitId: value.unit_id
    };
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
// 編集
export async function editLesson(
  lesson: Lesson
):Promise<OperationResult<Lesson, MessageLesson>> {
  const res:OperationResult<Lesson, MessageLesson> = {
    isSuccess: false,
    values: lesson,
    messages: {
      other: "これはdbController(単元編集)"
    },
  }
  try {
    const value = await prisma.lesson.update({
      where: {
        lesson_id: lesson.lessonId
      },
      data: {
        title: lesson.title,
        description: lesson.description,
        is_public: lesson.isPublic,
        unit_id: lesson.unitId
      }
    });
    res.values = {
      lessonId: value.lesson_id,
      title: value.title,
      description: value.description || "",
      isPublic: value.is_public,
      unitId: value.unit_id
    };
    res.messages.other = "更新に成功しました。";
    res.isSuccess = true;
    return res;
  } catch(error) {
    res.messages.other = String(error);
    return res;
  } finally {
    await prisma.$disconnect();
  }
}

// 削除
export async function deleteLesson(
  lessonId: string
):Promise<OperationResult<Lesson, MessageLesson>> {
  const res:OperationResult<Lesson, MessageLesson> = {
    isSuccess: false,
    values: {
      lessonId: "",
      title: "",
      description: "",
      isPublic: false,
      unitId: "",
    },
    messages: {
      other: "これはdbController(単元削除)"
    },
  }
  try {
    const value = await prisma.lesson.delete({
      where: {
        lesson_id: lessonId,
      }
    });
    res.values = {
      lessonId: value.lesson_id,
      title: value.title,
      description: value.description || "",
      isPublic: value.is_public,
      unitId: value.unit_id
    };
    res.messages.other = "削除に成功しました。";
    res.isSuccess = true;
    return res;
  } catch(error) {
    res.messages.other = String(error);
    return res;
  } finally {
    await prisma.$disconnect();
  }
}