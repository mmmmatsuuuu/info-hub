/*
  Warnings:

  - You are about to drop the `QuizImage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "QuizImage";

-- CreateTable
CREATE TABLE "Image" (
    "image_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "metadata" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("image_id")
);
