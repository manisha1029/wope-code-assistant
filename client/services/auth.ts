import { GitHubLoginURLResponse, LoginResponse } from "@/types/auth"
import { get } from "./makeRequest"

export const getGitHubLoginURL = async() => {
    return get<GitHubLoginURLResponse>(`/auth/github/login`)
}

// called on callback page with code from URL
export const handleCallback = async (code: string): Promise<LoginResponse> => {
    const res = await get<LoginResponse>(`/auth/github/callback?code=${code}`);
    if (!res.ok) throw new Error(res.error); // or whatever your Failure shape has
    return res.data;
};