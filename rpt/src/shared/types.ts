
export interface ITag {
    id: number;
    name: string;
}

export interface IPost {
    id: number;
    name: string;
    postDescription: string;
    img: string;
    likes: number;
    createdById: number;
    categoryId: number | null;
    createdAt: string;
    tags: {
        postId: number;
        tagName: string;
    }[];
}

export interface IComment {
    id: number;
    body: string;
    createdAt: string;
    postId: number;
    authorId: number;
}

export interface ILikedPost {
    userId: number;
    postId: number;
    post: IPost; 
}

export interface IFilteredProps {
    tags: { id: number; name: string }[];
}

export interface IUserForm {
    firstName: string;
    secondName: string;
    email: string;
    password?: string;
    avatar?: string | null;
}

export interface UserWithoutPassword {
    id: number;
    firstName: string;
    secondName?: string;
    email: string;
    avatar?: string | null;
    isAdmin: boolean;
}

export interface IUserProfile extends UserWithoutPassword {
    createdPosts: IPost[];
    comments: IComment[];
    likedPosts: ILikedPost[];
}

export interface IResponse {
    token: string;
}