/*
  Warnings:

  - You are about to drop the column `test_score` on the `Progress` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Progress" DROP COLUMN "test_score";

-- CreateTable
CREATE TABLE "QuizResult" (
    "quiz_result_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "quiz_id" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "point_allocation" INTEGER NOT NULL,
    "answer" JSONB NOT NULL,
    "correct_answer" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QuizResult_pkey" PRIMARY KEY ("quiz_result_id")
);

-- CreateTable
CREATE TABLE "LessonQuiz" (
    "lesson_id" TEXT NOT NULL,
    "quiz_id" TEXT NOT NULL,

    CONSTRAINT "LessonQuiz_pkey" PRIMARY KEY ("lesson_id","quiz_id")
);

-- CreateIndex
CREATE INDEX "QuizResult_user_id_idx" ON "QuizResult"("user_id");

-- CreateIndex
CREATE INDEX "QuizResult_quiz_id_idx" ON "QuizResult"("quiz_id");

-- AddForeignKey
ALTER TABLE "QuizResult" ADD CONSTRAINT "QuizResult_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizResult" ADD CONSTRAINT "QuizResult_quiz_id_fkey" FOREIGN KEY ("quiz_id") REFERENCES "Quiz"("quiz_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LessonQuiz" ADD CONSTRAINT "LessonQuiz_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "Lesson"("lesson_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LessonQuiz" ADD CONSTRAINT "LessonQuiz_quiz_id_fkey" FOREIGN KEY ("quiz_id") REFERENCES "Quiz"("quiz_id") ON DELETE CASCADE ON UPDATE CASCADE;
