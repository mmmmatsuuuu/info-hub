/*
  Warnings:

  - Made the column `type` on table `Content` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Content" ALTER COLUMN "type" SET NOT NULL;
