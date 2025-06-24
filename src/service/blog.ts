import { AxiosResponse } from "axios";
import { CommentType, PostType } from "../types/post";
import { axiosPublic as axios, axiosPrivate } from "../utils/axios";


export interface GetPostResponse {
    posts: PostType[];
    totalPosts:number  // total number of pages
}

export const getPosts = async ():Promise<PostType[]> => {
      const response = await axios.get("posts")
      return response.data.posts
}

export const getPost = async (slug:string):Promise<PostType> => {
    const response = await axios.get(`posts?slug=${slug}`)
    return response.data.posts[0]
}

export const getPostById = async (postId:string):Promise<PostType> => {
    const response = await axios.get(`posts/${postId}`)
    return response.data
}

export const getPaginatedPosts = async (category:string, sortBy: "asc" | "desc" = "desc", searchTerm:string = "",page:number = 1) => {
    let ct = category === "all" ? "" : category
    const  response = await axios.get(`posts?startIndex=${page}&category=${ct}&direction=${sortBy}&searchTerm=${searchTerm}`)
    // above line will return an object with posts and totalPosts where totalPosts is the total number of pages
    const fetchedPosts = response.data.posts as PostType[]
    const nextPage = response.data.totalPosts > page ? page + 1 : null

    return {
        posts: fetchedPosts,
        nextPage
    }
}

export const getPostsByCategory = async (category:string):Promise<PostType[]> => {
    let ct = category === "all" ? "" : category.toLowerCase()    
    const response = await axios.get(`posts?category=${ct}`)
    return response.data.posts
} 


export interface AddPostResponse {
    message: string;
    post: PostType;
}

export const addPost = async (formData: FormData):Promise<AxiosResponse<AddPostResponse>>  => {
    const response = await axiosPrivate.post("posts/create",formData,{
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
    return response
}

export const editPost = async (postId: string, formData: FormData):Promise<PostType> => {
    const response = await axiosPrivate.patch(`posts/${postId}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
}


export const deletePost = async (postId: string) => {
    const response = await axiosPrivate.delete(`posts/${postId}`)
    return response.data
}


export const addComment = async (postId: string, commentText: string):Promise<CommentType> => {
    const response =  await axiosPrivate.post(`comment/${postId}`, { text: commentText });
    return response.data.comment;
}


export const deleteComment = async (commentId: string) => {
    const response = await axiosPrivate.delete(`comment/${commentId}`);
    return response;
}

export const editComment = async (commentId: string, text: string):Promise<CommentType> => {
    const response = await axiosPrivate.patch(`comment/${commentId}`, { text });
    return response.data;
}