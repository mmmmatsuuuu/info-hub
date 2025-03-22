/*
  Warnings:

  - The `type` column on the `Content` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `type` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('admin', 'teacher', 'student');

-- CreateEnum
CREATE TYPE "ContentType" AS ENUM ('movie', 'quiz', 'other');

-- AlterTable
ALTER TABLE "Content" ADD COLUMN     "is_public" BOOLEAN NOT NULL DEFAULT false,
DROP COLUMN "type",
ADD COLUMN     "type" "ContentType";

-- AlterTable
ALTER TABLE "Lesson" ADD COLUMN     "is_public" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Subject" ADD COLUMN     "is_public" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Unit" ADD COLUMN     "is_public" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "type",
ADD COLUMN     "type" "UserType" NOT NULL DEFAULT 'student';
