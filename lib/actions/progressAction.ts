"use server"
import { OperationResult, Progress, MessageProgress } from "@/types/dbOperation";
import { setProgress } from "@lib/dbController/progress";

export async function incrementViewCountAction(
  progress: Progress
): Promise<OperationResult<Progress, MessageProgress>> {
  const res: OperationResult<Progress, MessageProgress> = {
    isSuccess: false,
    values: {
      studentId: progress.studentId,
      contentId: progress.contentId,
      viewCount: progress.viewCount + 1,
      testScore: progress.testScore,
    },
    messages: {},
  }
  try {
    // データベース登録
    const execValue = await setProgress(res.values);

    // 返り値
    res.isSuccess = execValue.isSuccess;
    res.values = execValue.values;
    res.messages = execValue.messages;
    return res;
  } catch(error) {
    res.messages.other = String(error);
    return res;
  }
}