export type CommentType = {
  _id: string;
  text: string;
  creator : Creator
  createdAt: string;
  updatedAt: string;
  post : string
}


export type Creator = {
  _id: string;
  username: string;
  posts: PostType[];
  avatar: string;
  email: string;
  createdAt: string;
  updatedAt: string;

}


export type User = {
    currentUser: Creator | null;
    token: string | null;
    isLoading: boolean;
}


export interface BlogCardProps {
  post: {
    _id: string;
    title: string;
    slug: string;
    summary: string;
    content: string;
    imageUrl: string;
    category: string;
    comments: CommentType[];
    creator : Creator
    updatedAt: string;
  };
  isAuth: boolean;
}


export interface PostType {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  imageUrl: string;
  category: string;
  comments: CommentType[];
  creator : Creator
  updatedAt: string;
  createdAt: string;
}
