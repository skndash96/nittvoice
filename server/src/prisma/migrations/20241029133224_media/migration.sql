-- AlterTable
ALTER TABLE "Comment" ALTER COLUMN "created_at" SET DEFAULT timezone('utc', now()),
ALTER COLUMN "updated_at" SET DEFAULT timezone('utc', now());

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "created_at" SET DEFAULT timezone('utc', now()),
ALTER COLUMN "updated_at" SET DEFAULT timezone('utc', now());

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "created_at" SET DEFAULT timezone('utc', now()),
ALTER COLUMN "updated_at" SET DEFAULT timezone('utc', now());

-- AlterTable
ALTER TABLE "Vote" ALTER COLUMN "created_at" SET DEFAULT timezone('utc', now()),
ALTER COLUMN "updated_at" SET DEFAULT timezone('utc', now());

-- CreateTable
CREATE TABLE "Media" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT timezone('utc', now()),

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
