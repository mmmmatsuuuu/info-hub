/*
  Warnings:

  - You are about to drop the column `lesson_id` on the `Content` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Content" DROP CONSTRAINT "Content_lesson_id_fkey";

-- AlterTable
ALTER TABLE "Content" DROP COLUMN "lesson_id";

-- CreateTable
CREATE TABLE "LessonContent" (
    "lesson_id" TEXT NOT NULL,
    "content_id" TEXT NOT NULL,

    CONSTRAINT "LessonContent_pkey" PRIMARY KEY ("lesson_id","content_id")
);

-- AddForeignKey
ALTER TABLE "LessonContent" ADD CONSTRAINT "LessonContent_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "Lesson"("lesson_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LessonContent" ADD CONSTRAINT "LessonContent_content_id_fkey" FOREIGN KEY ("content_id") REFERENCES "Content"("content_id") ON DELETE CASCADE ON UPDATE CASCADE;
