import { prisma } from '@lib/prisma';
import { ContentType } from '@node_modules/.prisma/client';
import { FormState, LessonContent, MessageLessonContent } from '@/types/form';

// 取得
export async function getLessonContent(
  type: "lesson" | "content",
  id: string,
): Promise<FormState<LessonContent[], MessageLessonContent>> {
  const res:FormState<LessonContent[], MessageLessonContent> = {
    isSuccess: false,
    values:[],
    messages: {
      other: "データ取得(lesson_content)"
    }
  }
  try {
    switch (type) {
      case "lesson":
        var values = await prisma.lessonContent.findMany({
          where: {
            lesson_id: id,
          }
        });
        if (values.length > 0) {
          values.map(v => {
            res.values.push({
              contentId: v.content_id,
              lessonId: v.lesson_id,
            });
          });
          res.isSuccess = true;
          res.messages.other = "取得に成功しました。";
        } else {
          res.isSuccess = false;
          res.messages.other = "授業に対応するコンテンツがありません。";
        }
        break;
      case "content":
        var values = await prisma.lessonContent.findMany({
          where: {
            content_id: id,
          }
        });
        if (values.length > 0) {
          values.map(v => {
            res.values.push({
              contentId: v.content_id,
              lessonId: v.lesson_id,
            });
          });
          res.isSuccess = true;
          res.messages.other = "取得に成功しました。";
        } else {
          res.isSuccess = false;
          res.messages.other = "コンテンツに対応する授業がありません。";
        }
        break;
      default:
        break;
    }
    return res;
  } catch (error) {
    res.isSuccess = false;
    res.messages.other = String(error);
    return res;
  } finally {
    await prisma.$disconnect();
  }
}

// 新規作成
export async function createLessonContent(
  data: LessonContent
): Promise<FormState<LessonContent, MessageLessonContent>> {
  const res:FormState<LessonContent, MessageLessonContent> = {
    isSuccess: false,
    values: {
      lessonId: "",
      contentId: "",
    },
    messages: {
      other: "データ追加（LessonContent）"
    }
  }
  try {
    const value = await prisma.lessonContent.create({
      data: {
        content_id: data.contentId,
        lesson_id: data.lessonId
      }
    });
    res.isSuccess = true;
    res.values = {
      lessonId: value.lesson_id,
      contentId: value.content_id,
    };
    res.messages.other = "データの追加に成功しました";
    return res;
  } catch (error) {
    res.isSuccess = false;
    res.messages.other = String(error);
    return res;
  } finally {
    await prisma.$disconnect();
  }
}

// 編集
/**
 * LessonContentテーブルはLessonテーブルとContentテーブルの
 * 中間テーブルなので、編集は行わない。
 */

// 削除
export async function deleteLessonContent(
  data: LessonContent
): Promise<FormState<LessonContent, MessageLessonContent>> {
  const res:FormState<LessonContent, MessageLessonContent> = {
    isSuccess: false,
    values: {
      lessonId: "",
      contentId: "",
    },
    messages: {
      other: "データ削除（LessonContent）"
    }
  }
  try {
    const value = await prisma.lessonContent.delete({
      where: {
        lesson_id_content_id: {
          lesson_id: data.lessonId,
          content_id: data.contentId
        }
      }
    });
    res.isSuccess = true;
    res.values = {
      contentId: value.content_id,
      lessonId: value.lesson_id,
    }
    res.messages.other = "削除に成功しました。";
    return res;
  } catch (error) {
    res.isSuccess = false;
    res.messages.other = String(error);
    return res;
  } finally {
    await prisma.$disconnect();
  }
}