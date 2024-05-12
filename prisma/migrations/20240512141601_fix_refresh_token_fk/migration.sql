/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `refresh-tokens` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "refresh-tokens_userId_key" ON "refresh-tokens"("userId");
