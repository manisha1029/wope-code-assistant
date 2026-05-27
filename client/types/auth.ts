export type GitHubLoginURLResponse = {
    url: string
}

export type LoginResponse = {
    access_token: string,
    user: {
        github_id: number,
        email: string,
        avatar: string,
    }
}