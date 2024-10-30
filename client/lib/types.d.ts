export type User = {
    id: string
    name: string
    email: string
}


export type Post = {
    id: string
    title: string
    authorId: string
    body: string
    mediaId: string
    createdAt: Date
    updatedAt: Date
    commentCount: number
    upvoteCount: number
    downvoteCount: number
}

export type FullPost = Post & {
    author: User
    votes: PostVote[]
    media: Media[]
    // comments: Comment[]
}

export type Media = {
    url: string,
    type: "image" | "video"
}

export type Comment = {
    id: string
    authorId: string
    postId: string
    body: string
    createdAt: Date
    updatedAt: Date
    upvoteCount: number
    downvoteCount: number
}

export type FullComment = Comment & {
    author: User
    post: Post
    votes: CommentVote[]
}

export type Vote = {
    id: string
    voterId: string
    voteType: number
    createdAt: Date
    updatedAt: Date
}

export type PostVote = Vote & {
    postId: string
}

export type CommentVote = Vote & {
    commentId: string
}

export type FullPostVote = PostVote & {
    voter: User
    post: Post
}

export type FullCommentVote = CommentVote & {
    voter: User
    comment: Comment
}
