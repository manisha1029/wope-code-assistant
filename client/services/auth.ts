import { GitHubLoginURLResponse, LoginResponse } from "@/types/auth"
import { get } from "./makeRequest"

export const getGitHubLoginURL = () => {
    return get<GitHubLoginURLResponse>(`/auth/github/login`)
}

// called on callback page with code from URL
export const handleCallback = (code: string) => {
    return get<LoginResponse>(`/auth/github/callback?code=${code}`)
}