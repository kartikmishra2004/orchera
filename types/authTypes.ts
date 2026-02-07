export type User = {
    id: string;
    fullName: string;
    email: string;
    avatar: string;
    createdAt: string;
}

export type RegisterPayload = {
    fullName: string;
    email: string;
    password: string;
    avatar?: string;
}

export type RegisterReturnType = {
    message: string;
}

export type LoginReturnType = {
    message: string;
}

export type LogoutReturnType = {
    message: string;
}

export type LoginPayload = {
    email: string;
    password: string;
}

export interface AuthContextType {
    user: User | null;
    loading: boolean;
    accessToken: string | null;

    registerUser: (
        payload: RegisterPayload,
        avatarFile: File
    ) => Promise<RegisterReturnType>;

    loginUser: (
        payload: LoginPayload
    ) => Promise<LoginReturnType>;

    logoutUser: () => Promise<LogoutReturnType>;
    refreshUser: () => Promise<void>;
}