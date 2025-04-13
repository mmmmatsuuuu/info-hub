"use server"
import { prisma } from "@lib/prisma";
import { Prisma } from "@node_modules/.prisma/client";
import { Questions } from "@/types/quiz";
import { Quiz, Message, OperationResult } from "@/types/dbOperation";

// 取得
export async function getQuiz(
  quizId: string
):Promise<OperationResult<Quiz, Message>> {
  const res:OperationResult<Quiz, Message> = {
    isSuccess: false,
    values: {
      quizId: "",
      title: "",
      description: "",
      isPublic: false,
      questions: []
    },
    messages: {
      other: "小テスト（取得）"
    }
  };
  try {
    const value = await prisma.quiz.findUnique({
      where: {
        quiz_id: quizId
      }
    });
    if (value == null) {
      res.messages.other = "小テストが見つかりません。";
      return res;
    }
    res.values = {
      quizId: value.quiz_id,
      title: value.title,
      description: value.description || "",
      isPublic: value.is_public,
      questions: value.questions as unknown as Questions,
    }
    res.messages.other = `小テストを取得しました。`;
    res.isSuccess = true;
    return res;
  } catch (error) {
    res.messages.other = String(error);
    return res;
  } finally {
    await prisma.$disconnect();
  }
}

export async function getPublicQuiz(
  quizId: string
):Promise<OperationResult<Quiz, Message>> {
  const res:OperationResult<Quiz, Message> = {
    isSuccess: false,
    values: {
      quizId: "",
      title: "",
      description: "",
      isPublic: false,
      questions: []
    },
    messages: {
      other: "小テスト（取得）"
    }
  };
  try {
    const value = await prisma.quiz.findUnique({
      where: {
        quiz_id: quizId,
        is_public: true,
      }
    });
    if (value == null) {
      res.messages.other = "小テストが見つかりません。";
      return res;
    }
    res.values = {
      quizId: value.quiz_id,
      title: value.title,
      description: value.description || "",
      isPublic: value.is_public,
      questions: value.questions as unknown as Questions,
    }
    res.messages.other = `小テストを取得しました。`;
    res.isSuccess = true;
    return res;
  } catch (error) {
    res.messages.other = String(error);
    return res;
  } finally {
    await prisma.$disconnect();
  }
}

export async function getAllQuiz():Promise<OperationResult<Quiz[], Message>> {
  const res:OperationResult<Quiz[], Message> = {
    isSuccess: false,
    values: [],
    messages: {
      other: "小テスト（取得）"
    }
  };
  try {
    const values = await prisma.quiz.findMany({
      orderBy: {
        quiz_id: "asc"
      }
    });
    if (values == null || values.length == 0) {
      res.messages.other = "小テストが見つかりません。";
      return res;
    }
    res.values = values.map((value) => ({
      quizId: value.quiz_id,
      title: value.title,
      description: value.description || "",
      isPublic: value.is_public,
      questions: value.questions as unknown as Questions,
    }));
    res.messages.other = `小テストを取得しました。`;
    res.isSuccess = true;
    return res;
  } catch (error) {
    res.messages.other = String(error);
    return res;
  } finally {
    await prisma.$disconnect();
  }
}

export async function getLessonQuiz(
  lessonId: string
):Promise<OperationResult<Quiz[], Message>> {
  const res:OperationResult<Quiz[], Message> = {
    isSuccess: false,
    values: [],
    messages: {
      other: "小テスト（取得）"
    }
  }
  try {
    const values = await prisma.lessonQuiz.findMany({
      where: {
        lesson_id: lessonId,
      },
      include: {
        Quiz: {}
      }
    });
    if (values.length == 0) {
      res.messages.other = "小テストが見つかりません。";
      return res;
    }
    values.map((value) => {
      res.values.push({
        quizId: value.Quiz.quiz_id,
        title: value.Quiz.title,
        description: value.Quiz.description || "",
        isPublic: value.Quiz.is_public,
        questions: value.Quiz.questions as unknown as Questions,
      });
    });
    res.messages.other = `小テストを取得しました。`;
    res.isSuccess = true;
    return res;
  } catch (error) {
    res.messages.other = String(error);
    return res;
  } finally {
    await prisma.$disconnect();
  }
}

// 追加
export async function createQuiz(
  quizId: string,
  title: string,
  description: string,
  isPublic: boolean,
  questions: Questions,
):Promise<OperationResult<Quiz, Message>> {
  const res:OperationResult<Quiz, Message> = {
    isSuccess: false,
    values: {
      quizId: "",
      title: "",
      description: "",
      isPublic: false,
      questions: []
    },
    messages: {
      other: "小テスト（追加）"
    }
  };
  try {
    const value = await prisma.quiz.create({
      data: {
        quiz_id: quizId,
        title: title,
        description: description,
        is_public: isPublic,
        questions: questions as unknown as Prisma.InputJsonValue,
      }
    });
    res.values = {
      quizId: value.quiz_id,
      title: value.title,
      description: value.description || "",
      isPublic: value.is_public,
      questions: value.questions as unknown as Questions,
    }
    res.messages.other = `追加に成功しました。`;
    res.isSuccess = true;
    return res;
  } catch (error) {
    res.messages.other = String(error);
    return res;
  } finally {
    await prisma.$disconnect();
  }
}

// 更新
export async function editQuiz(
  quiz: Quiz
):Promise<OperationResult<Quiz, Message>> {
  const res:OperationResult<Quiz, Message> = {
    isSuccess: false,
    values: quiz,
    messages: {
      other: "小テスト（更新）"
    }
  };
  try {
    const value = await prisma.quiz.update({
      where: {
        quiz_id: quiz.quizId,
      },
      data: {
        title: quiz.title,
        description: quiz.description,
        is_public: quiz.isPublic,
        questions: quiz.questions as unknown as Prisma.InputJsonValue,
      }
    });
    res.values = {
      quizId: value.quiz_id,
      title: value.title,
      description: value.description || "",
      isPublic: value.is_public,
      questions: value.questions as unknown as Questions,
    }
    res.messages.other = `更新に成功しました。`;
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
export async function deleteQuiz(
  quizId: string
):Promise<OperationResult<Quiz, Message>> {
  const res:OperationResult<Quiz, Message> = {
    isSuccess: false,
    values: {
      quizId: "",
      title: "",
      description: "",
      isPublic: false,
      questions: []
    },
    messages: {
      other: "小テスト（削除）"
    }
  };
  try {
    const value = await prisma.quiz.delete({
      where: {
        quiz_id: quizId
      }
    });
    res.values = {
      quizId: value.quiz_id,
      title: value.title,
      description: value.description || "",
      isPublic: value.is_public,
      questions: value.questions as unknown as Questions,
    };
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