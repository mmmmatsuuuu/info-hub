"use server"
import { prisma } from "@lib/prisma";
import { Prisma } from "@node_modules/.prisma/client";
import { QuizResult } from "@/types/quiz";

export async function createQuizResult(
  quizResult: QuizResult
):Promise<void> {
  try {
    const value = await prisma.quizResult.create({
      data: {
        quiz_id: quizResult.quizId,
        user_id: quizResult.userId,
        score: quizResult.score,
        point_allocation: quizResult.pointAllocation,
        answer: quizResult.answers as unknown as Prisma.InputJsonValue,
      }
    });
    console.log(value);
  } catch (error) {
    console.log("Error creating quiz result:", error);
  } finally {
    await prisma.$disconnect();
  }
}