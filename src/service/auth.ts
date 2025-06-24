import { Creator } from "../types/post";
import { axiosPrivate } from "../utils/axios";

export const loginUser = async (identifier : string, password: string) => {
    let response
    if(identifier.includes("@")) {
        response = await axiosPrivate.post("/users/login", { email: identifier, password });
    } else {
        response = await axiosPrivate.post("/users/login", { username: identifier, password });
    }
    return response;
}

export const register = async (username: string, email: string, password: string) => {
    const response = await axiosPrivate.put("/users/signup", { username, email, password });
    return response;
}

export const forgotPassword = async (identifier: string) => {
   let response
    if(identifier.includes("@")) {
        response = await axiosPrivate.post("/users/forgot", { email: identifier });
    } else {
        response = await axiosPrivate.post("/users/forgot", { username: identifier });
    }
    return response;
}


export const logoutUser = async () => {
    const response = await axiosPrivate.post("/users/logout");
    return response;
}



export const getUserProfile = async (username: string):Promise<Creator> => {
    const response = await axiosPrivate.get(`users/${username}`);
    return response.data;
}


export const getNewRefreshToken = async ():Promise<string>=>{
    const response = await axiosPrivate.post("users/refresh")
    return response.data.accessToken;
}


export interface UpdateUserBody {
    username?: string;
    email?: string;
    password?: string;
    avatar?: File | null;
}

interface UpdateUserResponse {
    updatedUser: Creator;
    message: string;
}

export const updateUserProfile = async (updateData : Partial<UpdateUserBody>):Promise<UpdateUserResponse> => {
    const response = await axiosPrivate.patch(`users/update`, updateData,{
        headers: {
            "Content-Type": "multipart/form-data",
        }
    });
    return response.data;
}

export const deleteAccount = async () => {
    const response = await axiosPrivate.post("users/remove", {});
    return response
}