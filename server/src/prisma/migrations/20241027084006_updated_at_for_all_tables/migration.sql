-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "updated_at" TIMESTAMP(3) DEFAULT timezone('utc', now()),
ALTER COLUMN "created_at" SET DEFAULT timezone('utc', now());

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "created_at" SET DEFAULT timezone('utc', now()),
ALTER COLUMN "updated_at" SET DEFAULT timezone('utc', now());

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "created_at" SET DEFAULT timezone('utc', now()),
ALTER COLUMN "updated_at" SET DEFAULT timezone('utc', now());

-- AlterTable
ALTER TABLE "Vote" ADD COLUMN     "updated_at" TIMESTAMP(3) DEFAULT timezone('utc', now()),
ALTER COLUMN "created_at" SET DEFAULT timezone('utc', now());
