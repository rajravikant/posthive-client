import { Creator } from "./post";

export type User = {
    currentUser: Creator | null;
    accessToken: string | null;
    refreshToken: string | null;
}
