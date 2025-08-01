/*
  Warnings:

  - You are about to drop the column `name` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `order` on the `Project` table. All the data in the column will be lost.
  - Added the required column `title` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."ProjectStatus" AS ENUM ('InProgress', 'Completed', 'OnHold');

-- AlterTable
ALTER TABLE "public"."Project" DROP COLUMN "name",
DROP COLUMN "order",
ADD COLUMN     "status" "public"."ProjectStatus" NOT NULL DEFAULT 'InProgress',
ADD COLUMN     "title" TEXT NOT NULL;
