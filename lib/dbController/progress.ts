import { prisma } from "@lib/prisma";
import { Progress, MessageProgress, OperationResult } from "@/types/dbOperation";

// 取得
export async function getProgress(
  studentId: string,
  contentId: string,
): Promise<OperationResult<Progress, MessageProgress>> {
  const res: OperationResult<Progress, MessageProgress> = {
    isSuccess: false,
    values: {
      studentId: studentId,
      contentId: contentId,
      viewCount: 0,
      testScore: 0,
    },
    messages: {
      other: "取得"
    },
  };
  try {
    const value = await prisma.progress.findUnique({
      where: {
        student_id_content_id: {
          student_id: studentId,
          content_id: contentId
        },
      },
    });
    if (value == null) {
      res.messages.other = "見つかりません。";
      return res;
    }
    res.values.studentId = value.student_id;
    res.values.contentId = value.content_id;
    res.values.viewCount = value.view_count;
    if (value.test_score) {
      res.values.testScore = value.test_score;
    }
    res.messages.other = "取得しました。";
    res.isSuccess = true;
    return res;
  } catch(error) {
    res.messages.other = String(error);
    return res;
  } finally {
    await prisma.$disconnect();
  }
}

// 追加または変更
export async function setProgress(
  progress: Progress
): Promise<OperationResult<Progress, MessageProgress>> {
  const res: OperationResult<Progress, MessageProgress> = {
    isSuccess: false,
    values: progress,
    messages: {
      other: "取得"
    },
  };
  try {
    const initialValue = await prisma.progress.findUnique({
      where: {
        student_id_content_id: {
          student_id: progress.studentId,
          content_id: progress.contentId
        },
      },
    });
    if (initialValue != null) {
      const value = await prisma.progress.update({
        where: {
          student_id_content_id: {
            student_id: progress.studentId,
            content_id: progress.contentId
          },
        },
        data: {
          view_count: progress.viewCount,
          test_score: progress.testScore
        }
      });
      res.values = {
        studentId: value.student_id,
        contentId: value.content_id,
        viewCount: value.view_count,
        testScore: value.test_score || 0,
      };
      res.messages.other = "登録に成功しました。";
      res.isSuccess = true;
      return res;
    } else {
      const value = await prisma.progress.create({
        data: {
          student_id: progress.studentId,
          content_id: progress.contentId,
          view_count: progress.viewCount,
          test_score: progress.testScore
        }
      });
      res.values = {
        studentId: value.student_id,
        contentId: value.content_id,
        viewCount: value.view_count,
        testScore: value.test_score || 0,
      };
      res.messages.other = "登録に成功しました。";
      res.isSuccess = true;
      return res;
    }
  } catch(error) {
    res.messages.other = String(error);
    return res;
  } finally {
    await prisma.$disconnect();
  }
}

// 削除
export async function deleteProgress(
  progress: Progress
): Promise<OperationResult<Progress, MessageProgress>> {
  const res: OperationResult<Progress, MessageProgress> = {
    isSuccess: false,
    values: progress,
    messages: {
      other: "取得"
    },
  };
  try {
    const value = await prisma.progress.delete({
      where: {
        student_id_content_id: {
          student_id: progress.studentId,
          content_id: progress.contentId
        }
      }
    });
    res.values = {
      studentId: value.student_id,
      contentId: value.content_id,
      viewCount: value.view_count,
      testScore: value.test_score || 0,
    }
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