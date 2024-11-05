-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "gender" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT timezone('utc', now()),
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "author_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT,
    "media" TEXT,
    "created_at" TIMESTAMP(3) DEFAULT timezone('utc', now()),
    "updated_at" TIMESTAMP(3),
    "comment_count" INTEGER NOT NULL DEFAULT 0,
    "upvote_count" INTEGER NOT NULL DEFAULT 0,
    "downvote_count" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "body" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,
    "author_id" TEXT NOT NULL,
    "upvote_count" INTEGER NOT NULL DEFAULT 0,
    "downvote_count" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) DEFAULT timezone('utc', now()),

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vote" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "vote_type" INTEGER NOT NULL,
    "voter_id" TEXT NOT NULL,
    "post_id" TEXT,
    "comment_id" TEXT,
    "created_at" TIMESTAMP(3) DEFAULT timezone('utc', now()),

    CONSTRAINT "Vote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Vote_voter_id_comment_id_key" ON "Vote"("voter_id", "comment_id");

-- CreateIndex
CREATE UNIQUE INDEX "Vote_voter_id_post_id_key" ON "Vote"("voter_id", "post_id");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_voter_id_fkey" FOREIGN KEY ("voter_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_comment_id_fkey" FOREIGN KEY ("comment_id") REFERENCES "Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddCheck constraint for Vote either postId or commentId
ALTER TABLE "Vote" ADD CONSTRAINT "vote_postId_commentId_check" 
    CHECK ((("post_id" IS NOT NULL AND "comment_id" IS NULL) OR 
            ("post_id" IS NULL AND "comment_id" IS NOT NULL)));