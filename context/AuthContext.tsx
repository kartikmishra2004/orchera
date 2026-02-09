"use client"
import { refresh, register, uploadAvatar, login, logout } from "@/lib/api/auth"
import { AuthContextType, LoginPayload, LogoutReturnType, RegisterPayload, RegisterReturnType, User } from "@/types/authTypes"
import { createContext, useContext, useState, useEffect } from "react"
import LoadingSpinner from "@/components/LoadingSpinner"

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [accessToken, setAccessToken] = useState<string | null>(null)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        refreshUser();
    }, []);

    const registerUser = async (
        payload: RegisterPayload,
        avatarFile: File
    ): Promise<RegisterReturnType> => {
        try {
            const avatar = await uploadAvatar(avatarFile);

            const finalPayload: RegisterPayload = {
                ...payload,
                avatar,
            };

            const res = await register(finalPayload);

            if (res.success) {
                sessionStorage.removeItem("email");
                setAccessToken(res.data.accessToken);
                setUser(res.data.user);
            }

            return {
                success: res.success,
                message: res.message,
            };

        } catch (error) {
            console.error("Failed to register!!", error);
            return {
                success: false,
                message: "Registration failed!!",
            };
        }
    };


    const loginUser = async (
        payload: LoginPayload
    ): Promise<RegisterReturnType> => {
        try {
            const res = await login(payload);
            if (res.success) {
                setAccessToken(res.data.accessToken);
                setUser(res.data.user);
            }

            return {
                success: res.success,
                message: res.message,
            };

        } catch (error) {
            console.error("Login failed!!", error);
            return {
                success: false,
                message: "Login failed!!",
            };
        }
    }

    const logoutUser = async (): Promise<LogoutReturnType> => {
        try {
            const res = await logout();

            if (res.success) {
                setUser(null);
                setAccessToken(null);
            }
            return {
                success: res.success,
                message: res.message,
            }

        } catch (error) {
            console.error("Logout failed!!", error);
            return {
                success: false,
                message: "Logout failed!!",
            };
        }
    }

    const refreshUser = async (): Promise<void> => {
        try {
            const res = await refresh();

            if (!res.success) {
                await logoutUser();
                return;
            }

            setUser(res.data.user);
            setAccessToken(res.data.accessToken);
        } catch (error) {
            console.error("Refresh failed!!", error);
            setUser(null);
            setAccessToken(null);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!user || !accessToken) return;

        const REFRESH_INTERVAL = 14 * 60 * 1000;

        const intervalId = setInterval(() => {
            refreshUser();
        }, REFRESH_INTERVAL);

        return () => clearInterval(intervalId);
    }, [user, accessToken]);

    return (
        <AuthContext.Provider
            value={{ user, accessToken, loading, registerUser, loginUser, logoutUser, refreshUser }}
        >
            {loading ? <LoadingSpinner /> : children}
        </AuthContext.Provider>
    )
}

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return context;
};
