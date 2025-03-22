import { prisma } from '@lib/prisma';
import { ContentType } from '@node_modules/.prisma/client';
import { Content, MessageContent, ContentWithLessons, Lesson,FormState } from '@/types/form';

// 取得
export async function getContent(
  contentId: string
) {
  try {
    const content = await prisma.content.findUnique({
      where: {
        content_id: contentId
      }
    });
    return content;

  } catch (e) {
    return null;
  } finally {
    await prisma.$disconnect();
  }
}

export async function getAllContents(

) {
  try {
    const datas = await prisma.content.findMany({
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
    
    const contents:ContentWithLessons[] = [];
  
    datas.map(async d => {
      const lessons:Lesson[] = [];
      d.Lessons.map(l => {
        const tempL:Lesson = {
          lessonId: l.Lesson.lesson_id,
          title: l.Lesson.title,
          description: l.Lesson.description || "",
          unitId: l.Lesson.unit_id,
          isPublic: l.Lesson.is_public,
        }
        lessons.push(tempL);
      })
      const temp:ContentWithLessons = {
        contentId: d.content_id,
        title: d.title,
        description: d.description || "",
        type: d.type,
        url: d.url,
        isPublic: d.is_public,
        lessons: lessons,
      }
      contents.push(temp);
    })
  
    return contents;
  } catch (e) {
    return null;
  } finally {
    await prisma.$disconnect();
  }
}

export async function getLessonContents(
  lessonId: string
) {
  try {
    const contentIds:string[] = [];
    const records = await prisma.lessonContent.findMany({
      where: {
        lesson_id: lessonId
      }
    });
    records.map(r => {
      contentIds.push(r.content_id);
    })
    const contents:Content[] = [];
    const datas = await prisma.content.findMany({
      where: {
        content_id: { in: contentIds }
      },
      orderBy: {
        content_id: "asc",
      },
    });
    datas.map(data => {
      contents.push({
        contentId: data.content_id,
        title: data.title,
        description: data.description || "",
        isPublic: data.is_public,
        type: data.type,
        url: data.url,
      });
    });
    return contents;
  } catch (e) {
    return null;
  } finally {
    await prisma.$disconnect();
  }
}

export async function getNotLessonContents(
  lessonId: string
) {
  try {
    const contentIds:string[] = [];
    const records = await prisma.lessonContent.findMany({
      where: {
        lesson_id: lessonId
      }
    });
    records.map(r => {
      contentIds.push(r.content_id);
    })
    const contents:Content[] = [];
    const datas = await prisma.content.findMany({
      where: {
        content_id: { notIn: contentIds }
      },
      orderBy: {
        content_id: "asc",
      },
    });
    datas.map(data => {
      contents.push({
        contentId: data.content_id,
        title: data.title,
        description: data.description || "",
        isPublic: data.is_public,
        type: data.type,
        url: data.url,
      });
    });
    return contents;
  } catch (e) {
    return null;
  } finally {
    await prisma.$disconnect();
  }
}

// 新規作成
export async function createContent(
  contentId: string, title: string, description: string, type: ContentType, url: string, isPublic: boolean
): Promise<FormState<Content, MessageContent>> {
  const res:FormState<Content, MessageContent> = {
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
export async function editContent(
  content: Content
): Promise<FormState<Content, MessageContent>> {
  const res:FormState<Content, MessageContent> = {
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
): Promise<FormState<Content, MessageContent>> {
  const res:FormState<Content, MessageContent> = {
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
    res.isSuccess = true;
    res.messages.other = `削除に成功しました。`;
    return res;
  } catch (error) {
    res.messages.other = String(error);
    return res;
  } finally {
    await prisma.$disconnect();
  }
}