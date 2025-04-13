/*
  Warnings:

  - You are about to drop the column `content_id` on the `Quiz` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Quiz" DROP CONSTRAINT "Quiz_content_id_fkey";

-- DropIndex
DROP INDEX "Quiz_content_id_key";

-- AlterTable
ALTER TABLE "Quiz" DROP COLUMN "content_id";
