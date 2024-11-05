-- AlterTable
ALTER TABLE "Comment" ALTER COLUMN "created_at" SET DEFAULT timezone('utc', now());

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "created_at" SET DEFAULT timezone('utc', now());

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "created_at" SET DEFAULT timezone('utc', now());

-- AlterTable
ALTER TABLE "Vote" ALTER COLUMN "created_at" SET DEFAULT timezone('utc', now());
