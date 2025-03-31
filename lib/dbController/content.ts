"use server"
import { prisma } from '@lib/prisma';
import { ContentType } from '@node_modules/.prisma/client';
import { Content, MessageContent, ContentAndLessons, MessageContentAndLessons, OperationResult } from '@/types/dbOperation';

// 取得
export async function getContent(
  contentId: string
):Promise<OperationResult<Content, MessageContent>> {
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
      other: "",
    },
  };
  try {
    const value = await prisma.content.findUnique({
      where: {
        content_id: contentId
      }
    });
    if (value == null) {
      res.messages.other = "コンテンツが見つかりません。";
      return res;
    }
    res.values = {
      contentId: value.content_id,
      title: value.title,
      description: value.description || "",
      type: value.type,
      isPublic: value.is_public,
      url: value.url,
    }
    res.messages.other = "コンテンツを取得しました。";
    res.isSuccess = true;
    return res;
  } catch (error) {
    res.messages.other = String(error);
    return res;
  } finally {
    await prisma.$disconnect();
  }
}

export async function getAllContents(

):Promise<OperationResult<ContentAndLessons[], MessageContentAndLessons>> {
  const res:OperationResult<ContentAndLessons[], MessageContentAndLessons> = {
    isSuccess: false,
    values: [],
    messages: {
      other: "",
    },
  };
  try {
    const value = await prisma.content.findMany({
      orderBy: {
        content_id: "asc",
      },
      include: {
        Lessons: {
          include: {
            Lesson: {}
          }
        }
      }
    });
    if (value.length == 0) {
      res.messages.other = "コンテンツが見つかりません。";
      return res;
    }
    value.map(v => {
      if (v.Lessons.length > 0) {
        const content:ContentAndLessons = {
          contentId: v.content_id,
          title: v.title,
          description: v.description || "",
          type: v.type,
          isPublic: v.is_public,
          url: v.url,
          lessons: [],
        };
        v.Lessons.map(l => {
          content.lessons.push({
            lessonId: l.Lesson.lesson_id,
            title: l.Lesson.title,
            description: l.Lesson.description || "",
            isPublic: l.Lesson.is_public,
            unitId: l.Lesson.unit_id,
          });
        });
        res.values.push(content);
      }
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

export async function getLessonContents(
  lessonId: string
):Promise<OperationResult<Content[], MessageContent>> {
  const res:OperationResult<Content[], MessageContent> = {
    isSuccess: false,
    values: [],
    messages: {
      other: "",
    },
  };
  try {
    const contentIds:string[] = [];
    const records = await prisma.lessonContent.findMany({
      where: {
        lesson_id: lessonId
      }
    });
    if (records.length == 0) {
      res.messages.other = "コンテンツが見つかりません。";
      res.isSuccess = true;
      return res;
    }
    records.map(r => {
      contentIds.push(r.content_id);
    });

    const value = await prisma.content.findMany({
      where: {
        content_id: { in: contentIds }
      },
      orderBy: {
        content_id: "asc",
      },
    });
    if (value.length == 0) {
      res.messages.other = "コンテンツが見つかりません。";
      res.isSuccess = true;
      return res;
    }
    value.map(v => {
      res.values.push({
        contentId: v.content_id,
        title: v.title,
        description: v.description || "",
        isPublic: v.is_public,
        type: v.type,
        url: v.url,
      });
    });
    res.messages.other = "コンテンツを取得しました。";
    res.isSuccess = true;
    return res;
  } catch (error) {
    res.messages.other = String(error);
    return res;
  } finally {
    await prisma.$disconnect();
  }
}

export async function getNotLessonContents(
  lessonId: string
):Promise<OperationResult<Content[], MessageContent>> {
  const res:OperationResult<Content[], MessageContent> = {
    isSuccess: false,
    values: [],
    messages: {
      other: "",
    },
  };
  try {
    const contentIds:string[] = [];
    const records = await prisma.lessonContent.findMany({
      where: {
        lesson_id: lessonId
      }
    });
    if (records.length == 0) {
      res.messages.other = "コンテンツが見つかりません。";
      res.isSuccess = true;
      return res;
    }

    records.map(r => {
      contentIds.push(r.content_id);
    });
    const value = await prisma.content.findMany({
      where: {
        content_id: { notIn: contentIds }
      },
      orderBy: {
        content_id: "asc",
      },
    });
    if (value.length == 0) {
      res.messages.other = "コンテンツが見つかりません。";
      res.isSuccess = true;
      return res;
    }
    value.map(v => {
      res.values.push({
        contentId: v.content_id,
        title: v.title,
        description: v.description || "",
        isPublic: v.is_public,
        type: v.type,
        url: v.url,
      });
    });
    res.messages.other = "コンテンツを取得しました。";
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
export async function createContent(
  contentId: string, title: string, description: string, type: ContentType, url: string, isPublic: boolean
): Promise<OperationResult<Content, MessageContent>> {
  const res:OperationResult<Content, MessageContent> = {
    isSuccess: false,
    values: {
      contentId: "",
      title: "",
      description: "",
      isPublic: false,
      type: "",
      url: ""
    },
    messages: {
      other: "これはdbController(コンテンツ作成)"
    }
  }
  try {
    const value = await prisma.content.create({
      data: {
        content_id: contentId,
        title: title,
        description: description,
        is_public: isPublic,
        type: type,
        url: url,
      }
    });

    res.values = {
      contentId: value.content_id,
      title: value.title,
      description: value.description || "",
      isPublic: value.is_public,
      type: value.type,
      url: value.url
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

// 編集
export async function editContent(
  content: Content
): Promise<OperationResult<Content, MessageContent>> {
  const res:OperationResult<Content, MessageContent> = {
    isSuccess: false,
    values: content,
    messages: {
      other: "これはdbController(コンテンツ作成)"
    }
  }
  try {
    const value = await prisma.content.update({
      where: {
        content_id: content.contentId,
      },
      data: {
        title: content.title,
        description: content.description,
        is_public: content.isPublic,
        type: content.type as ContentType,
        url: content.url,
      }
    });
    res.values = {
      contentId: value.content_id,
      title: value.title,
      description: value.description || "",
      isPublic: value.is_public,
      type: value.type,
      url: value.url
    }
    res.isSuccess = true;
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
export async function deleteContent(
  contentId: string
): Promise<OperationResult<Content, MessageContent>> {
  const res:OperationResult<Content, MessageContent> = {
    isSuccess: false,
    values: {
      contentId: "",
      title: "",
      description: "",
      isPublic: false,
      type: "",
      url: ""
    },
    messages: {
      other: "これはdbController(コンテンツ作成)"
    }
  }
  try {
    const value = await prisma.content.delete({
      where: {
        content_id: contentId,
      }
    });
    res.values = {
      contentId: value.content_id,
      title: value.title,
      description: value.description || "",
      isPublic: value.is_public,
      type: value.type,
      url: value.url
    }
    res.messages.other = `削除に成功しました。`;
    res.isSuccess = true;
    return res;
  } catch (error) {
    res.messages.other = String(error);
    return res;
  } finally {
    await prisma.$disconnect();
  }
}