/*
  Warnings:

  - You are about to drop the `LessonQuiz` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Quiz` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `QuizResult` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "LessonQuiz" DROP CONSTRAINT "LessonQuiz_lesson_id_fkey";

-- DropForeignKey
ALTER TABLE "LessonQuiz" DROP CONSTRAINT "LessonQuiz_quiz_id_fkey";

-- DropForeignKey
ALTER TABLE "QuizResult" DROP CONSTRAINT "QuizResult_quiz_id_fkey";

-- DropForeignKey
ALTER TABLE "QuizResult" DROP CONSTRAINT "QuizResult_user_id_fkey";

-- DropTable
DROP TABLE "LessonQuiz";

-- DropTable
DROP TABLE "Quiz";

-- DropTable
DROP TABLE "QuizResult";
