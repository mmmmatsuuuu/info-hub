import { prisma } from '@lib/prisma';
import { Content } from '@prisma/client';
import { dbControllerType } from '@/types/dbData';
import { Lesson, MessageLesson, FormState } from '@/types/form';

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

type LessonPreview = {
  unit_id: string;
  description: string | null;
  is_public: boolean;
  created_at: Date;
  updated_at: Date;
  lesson_id: string;
  title: string;
  movies: Content[],
  quiz: Content[],
  others: Content[],
}
type ResLesson = dbControllerType<LessonPreview | null, any>;
export async function getLesson(
  lessonId: string
): Promise<ResLesson> {
  const res:ResLesson = {
    isSuccess: false,
    values: null,
    messages: {},
  }
  try {
    const movies = [];
    const quiz = [];
    const others = [];
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
            movies.push(content);
            break;
          case "quiz":
            quiz.push(content);
            break;
          default:
            others.push(content);
            break;
        }
      }
    }
    res.values = {
      unit_id: lesson.unit_id,
      description: lesson.description,
      is_public: lesson.is_public,
      lesson_id: lesson.lesson_id,
      title: lesson.title,
      created_at: lesson.created_at,
      updated_at: lesson.updated_at,
      movies: movies,
      quiz: quiz,
      others: others,
    }
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
): Promise<ResLesson> {
  const res:ResLesson = {
    isSuccess: false,
    values: null,
    messages: {},
  }
  try {
    const movies = [];
    const quiz = [];
    const others = [];
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
            movies.push(content);
            break;
          case "quiz":
            quiz.push(content);
            break;
          default:
            others.push(content);
            break;
        }
      }
    }
    res.values = {
      unit_id: lesson.unit_id,
      description: lesson.description,
      is_public: lesson.is_public,
      lesson_id: lesson.lesson_id,
      title: lesson.title,
      created_at: lesson.created_at,
      updated_at: lesson.updated_at,
      movies: movies,
      quiz: quiz,
      others: others,
    }
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
):Promise<FormState<Lesson, MessageLesson>> {
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
    res.isSuccess = true;
    res.messages.other = "登録に成功しました。";
    res.values = {
      lessonId: value.lesson_id,
      title: value.title,
      description: value.description || "",
      isPublic: value.is_public,
      unitId: value.unit_id
    };
    return res;
  } catch (error) {
    res.messages.other = String(error);
    return res;
  } finally {
    await prisma.$disconnect();
  }
}
// 編集
export async function editLesson(lesson: Lesson):Promise<FormState<Lesson, MessageLesson>> {
  const res:FormState<Lesson, MessageLesson> = {
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
    res.isSuccess = true;
    res.values = {
      lessonId: value.lesson_id,
      title: value.title,
      description: value.description || "",
      isPublic: value.is_public,
      unitId: value.unit_id
    };
    res.messages.other = "更新に成功しました。";
    return res;
  } catch(error) {
    res.messages.other = String(error);
    return res;
  } finally {
    await prisma.$disconnect();
  }
}

// 削除
export async function deleteLesson(lessonId: string):Promise<FormState<Lesson, MessageLesson>> {
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
      other: "これはdbController(単元削除)"
    },
  }
  try {
    const value = await prisma.lesson.delete({
      where: {
        lesson_id: lessonId,
      }
    });
    res.isSuccess = true;
    res.values = {
      lessonId: value.lesson_id,
      title: value.title,
      description: value.description || "",
      isPublic: value.is_public,
      unitId: value.unit_id
    };
    res.messages.other = "削除に成功しました。";
    return res;
  } catch(error) {
    res.messages.other = String(error);
    return res;
  } finally {
    await prisma.$disconnect();
  }
}