export type PostType = {
    id: string,
    title: string,
    media: string,
    userId: number,
    votes: number,
    body?: string,
    createdAt: Date
};

export type PostTypeInsert = {
    title: string,
    media: string,
    userId: number,
    body?: string
};

export type UserType = {
    id: number,
    name: string,
    phone: string,
    gender: string,
    createdAt: Date
};

export type UserTypeInsert = {
    id: number,
    name: string,
    phone: string,
    gender: string
};

export function toPost(d: any): PostType {
    return {
        id: d.id,
        title: d.title,
        media: d.media,
        userId: d.user_id,
        votes: d.votes,
        body: d.body,
        createdAt: new Date(d.created_at)
    };
}

export function toUser(d: any): UserType {
    return {
        id: d.id,
        name: d.name,
        phone: d.phone,
        gender: d.gender,
        createdAt: d.created_at
    };
}